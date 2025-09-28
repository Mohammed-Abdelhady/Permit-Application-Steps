import classNames from 'classnames';
import { motion } from 'framer-motion';
import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SelectDropdown from './SelectDropdown';
import SelectTrigger from './SelectTrigger';
import type { FormSelectProps } from './types';

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      label,
      options,
      value,
      onChange,
      onBlur,
      onValueChange,
      error,
      helperText,
      required,
      className,
      isRTL,
      placeholder,
      description,
      searchable = false,
      clearable = false,
      maxHeight = 200,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    // Generate unique IDs for accessibility
    const selectId = useId();
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;
    const descriptionId = `${selectId}-description`;
    const listboxId = `${selectId}-listbox`;
    const searchId = `${selectId}-search`;

    // Refs for managing focus and clicks
    const containerRef = useRef<HTMLDivElement>(null);

    // Filter options based on search term
    const filteredOptions = searchable
      ? options.filter(option =>
          t(option.label).toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;

    // Get selected option
    const selectedOption = options.find(option => option.value === value);

    // Create aria-describedby string
    const ariaDescribedBy = [
      description && descriptionId,
      helperText && helperId,
      error && errorId,
    ]
      .filter(Boolean)
      .join(' ');

    // Helper function to handle value changes
    const handleValueChange = (newValue: string) => {
      // Call custom onChange if provided
      onValueChange?.(newValue);

      // Call standard onChange if provided (for React Hook Form compatibility)
      if (onChange) {
        // Create a simple synthetic event that matches React Hook Form expectations
        const syntheticEvent = {
          target: { value: newValue, name: props.name || '' },
          currentTarget: { value: newValue, name: props.name || '' },
        } as unknown as React.ChangeEvent<HTMLSelectElement>;

        onChange(syntheticEvent);
      }
    };

    // Handle option selection
    const handleSelect = (optionValue: string) => {
      handleValueChange(optionValue);

      // Trigger onBlur to mark field as touched for React Hook Form
      if (onBlur) {
        const syntheticBlurEvent = {
          target: { name: props.name || '', value: optionValue },
          currentTarget: { name: props.name || '', value: optionValue },
        } as React.FocusEvent<HTMLSelectElement>;
        onBlur(syntheticBlurEvent);
      }

      setIsOpen(false);
      setSearchTerm('');
      setHighlightedIndex(-1);
    };

    // Handle clear
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      handleValueChange('');
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          if (!isOpen) {
            setIsOpen(true);
            e.preventDefault();
          } else if (highlightedIndex >= 0) {
            handleSelect(filteredOptions[highlightedIndex].value);
            e.preventDefault();
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
        case 'ArrowDown':
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setHighlightedIndex(prev =>
              prev < filteredOptions.length - 1 ? prev + 1 : 0
            );
          }
          e.preventDefault();
          break;
        case 'ArrowUp':
          if (isOpen) {
            setHighlightedIndex(prev =>
              prev > 0 ? prev - 1 : filteredOptions.length - 1
            );
            e.preventDefault();
          }
          break;
        case 'Tab':
          setIsOpen(false);
          setHighlightedIndex(-1);
          setSearchTerm('');
          // Don't prevent default - allow normal tab navigation
          break;
      }
    };

    // Close dropdown when clicking outside or losing focus
    useEffect(() => {
      const containerElement = containerRef.current;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerElement &&
          !containerElement.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      const handleFocusOut = (event: FocusEvent) => {
        if (
          containerElement &&
          !containerElement.contains(event.relatedTarget as Node)
        ) {
          setIsOpen(false);
          setHighlightedIndex(-1);
          setSearchTerm('');
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      containerElement?.addEventListener('focusout', handleFocusOut);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        containerElement?.removeEventListener('focusout', handleFocusOut);
      };
    }, []);

    // Determine the display value for the select button
    let displayValue: string;
    if (selectedOption) {
      displayValue = t(selectedOption.label);
    } else if (placeholder) {
      displayValue = t(placeholder);
    } else {
      displayValue = t('common.selectOption');
    }

    // If not searchable, render traditional select
    if (!searchable) {
      return (
        <motion.div
          data-testid="form-select-container"
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <label
            data-testid="form-select-label"
            htmlFor={selectId}
            className={classNames(
              'block cursor-pointer text-sm font-medium',
              {
                'text-gray-700': !error,
                'text-red-600': error,
              },
              isRTL ? 'text-right' : 'text-left'
            )}
          >
            {t(label)}
            {required && (
              <span
                data-testid="form-select-required"
                className="ml-1 text-red-500"
                aria-label={t('form.required')}
                title={t('form.required')}
              >
                *
              </span>
            )}
          </label>

          {description && (
            <motion.div
              data-testid="form-select-description"
              id={descriptionId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={classNames(
                'text-sm text-gray-600',
                isRTL ? 'text-right' : 'text-left'
              )}
            >
              {t(description)}
            </motion.div>
          )}

          <motion.div
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <select
              data-testid="form-select-field"
              ref={ref}
              id={selectId}
              value={value}
              onChange={onChange || (e => onValueChange?.(e.target.value))}
              aria-invalid={error ? 'true' : 'false'}
              aria-required={required ? 'true' : 'false'}
              aria-describedby={ariaDescribedBy || undefined}
              className={classNames(
                'block w-full rounded-lg border px-3 py-2 text-sm transition-all duration-200 focus:ring-2 focus:outline-none md:px-4 md:py-3 md:text-base',
                {
                  'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500':
                    !error,
                  'border-red-300 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-500':
                    error,
                },
                className
              )}
              {...props}
            >
              {placeholder && (
                <option value="" disabled>
                  {t(placeholder)}
                </option>
              )}
              {options.map(option => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {t(option.label)}
                </option>
              ))}
            </select>
          </motion.div>

          {helperText && !error && (
            <motion.div
              data-testid="form-select-helper"
              id={helperId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.2 }}
              className={classNames(
                'text-sm text-gray-500',
                isRTL ? 'text-right' : 'text-left'
              )}
            >
              {t(helperText)}
            </motion.div>
          )}

          {error && (
            <motion.div
              data-testid="form-select-error"
              id={errorId}
              role="alert"
              aria-live="polite"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.2 }}
              className={classNames(
                'text-sm text-red-600',
                isRTL ? 'text-right' : 'text-left'
              )}
            >
              <span className="sr-only">{t('form.error')}: </span>
              {t(error)}
            </motion.div>
          )}
        </motion.div>
      );
    }

    // Enhanced searchable select with custom dropdown
    return (
      <motion.div
        data-testid="form-select-searchable-container"
        ref={containerRef}
        className="relative space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <label
          data-testid="form-select-searchable-label"
          htmlFor={selectId}
          className={classNames(
            'block cursor-pointer text-sm font-medium',
            {
              'text-gray-700': !error,
              'text-red-600': error,
            },
            isRTL ? 'text-right' : 'text-left'
          )}
        >
          {t(label)}
          {required && (
            <span
              data-testid="form-select-searchable-required"
              className="ml-1 text-red-500"
              aria-label={t('form.required')}
              title={t('form.required')}
            >
              *
            </span>
          )}
        </label>

        {description && (
          <motion.div
            data-testid="form-select-searchable-description"
            id={descriptionId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={classNames(
              'text-sm text-gray-600',
              isRTL ? 'text-right' : 'text-left'
            )}
          >
            {t(description)}
          </motion.div>
        )}

        {/* Hidden select for form compatibility */}
        <select
          ref={ref}
          id={selectId}
          value={value}
          onChange={onChange || (e => onValueChange?.(e.target.value))}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          {...props}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {t(option.label)}
            </option>
          ))}
        </select>

        {/* Custom Dropdown Button */}
        <SelectTrigger
          isOpen={isOpen}
          displayValue={displayValue}
          selectedOption={selectedOption}
          clearable={clearable}
          error={error}
          required={required}
          ariaDescribedBy={ariaDescribedBy}
          onToggle={() => setIsOpen(!isOpen)}
          onClear={handleClear}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            // Small delay to allow focus to move to next element
            setTimeout(() => {
              if (!containerRef.current?.contains(document.activeElement)) {
                setIsOpen(false);
                setHighlightedIndex(-1);
                setSearchTerm('');
              }
            }, 100);
          }}
        />

        {/* Dropdown Menu */}
        <SelectDropdown
          isOpen={isOpen}
          searchable={searchable}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filteredOptions={filteredOptions}
          value={value}
          highlightedIndex={highlightedIndex}
          onSelect={handleSelect}
          onHighlight={setHighlightedIndex}
          onClearHighlight={() => setHighlightedIndex(-1)}
          maxHeight={maxHeight}
          searchId={searchId}
          listboxId={listboxId}
        />

        {helperText && !error && (
          <motion.div
            data-testid="form-select-searchable-helper"
            id={helperId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2 }}
            className={classNames(
              'text-sm text-gray-500',
              isRTL ? 'text-right' : 'text-left'
            )}
          >
            {t(helperText)}
          </motion.div>
        )}

        {error && (
          <motion.div
            data-testid="form-select-searchable-error"
            id={errorId}
            role="alert"
            aria-live="polite"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2 }}
            className={classNames(
              'text-sm text-red-600',
              isRTL ? 'text-right' : 'text-left'
            )}
          >
            <span className="sr-only">{t('form.error')}: </span>
            {t(error)}
          </motion.div>
        )}
      </motion.div>
    );
  }
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;
