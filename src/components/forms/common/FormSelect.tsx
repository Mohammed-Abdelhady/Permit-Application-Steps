import { forwardRef, useId, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  required?: boolean;
  isRTL?: boolean;
  placeholder?: string;
  description?: string;
  searchable?: boolean;
  clearable?: boolean;
  maxHeight?: number;
  onValueChange?: (value: string) => void;
}

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
    const listboxRef = useRef<HTMLUListElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

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
          break;
      }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Focus search input when dropdown opens
    useEffect(() => {
      if (isOpen && searchable && searchRef.current) {
        searchRef.current.focus();
      }
    }, [isOpen, searchable]);

    // Scroll highlighted option into view
    useEffect(() => {
      if (highlightedIndex >= 0 && listboxRef.current) {
        const highlightedElement = listboxRef.current.children[
          highlightedIndex
        ] as HTMLElement;
        if (highlightedElement) {
          highlightedElement.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth',
          });
        }
      }
    }, [highlightedIndex]);

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
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <label
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
              ref={ref}
              id={selectId}
              value={value}
              onChange={onChange || (e => onValueChange?.(e.target.value))}
              aria-invalid={error ? 'true' : 'false'}
              aria-required={required ? 'true' : 'false'}
              aria-describedby={ariaDescribedBy || undefined}
              className={classNames(
                'block w-full rounded-lg border px-4 py-3 text-sm transition-all duration-200 focus:ring-2 focus:outline-none',
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
        ref={containerRef}
        className="relative space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <label
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
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-describedby={ariaDescribedBy || undefined}
          aria-invalid={error ? 'true' : 'false'}
          aria-required={required ? 'true' : 'false'}
          className={classNames(
            'relative w-full rounded-lg border px-4 py-3 text-left text-sm transition-all duration-200 focus:ring-2 focus:outline-none',
            {
              'border-gray-300 bg-white text-gray-900 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500':
                !error,
              'border-red-300 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-500':
                error,
            }
          )}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <span className="flex items-center justify-between">
            <span
              className={classNames('truncate', {
                'text-gray-500': !selectedOption,
                'text-gray-900': selectedOption,
              })}
            >
              {displayValue}
            </span>

            <span className="flex items-center space-x-2">
              {/* Clear button */}
              {clearable && selectedOption && (
                <motion.button
                  type="button"
                  onClick={handleClear}
                  className="rounded p-1 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  aria-label={t('common.clear')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.button>
              )}

              {/* Dropdown arrow */}
              <motion.svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </motion.svg>
            </span>
          </span>
        </motion.button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg"
            >
              {/* Search Input */}
              <div className="border-b border-gray-200 p-2">
                <input
                  ref={searchRef}
                  id={searchId}
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder={t('common.search')}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  aria-label={t('common.searchOptions')}
                />
              </div>

              {/* Options List */}
              <ul
                ref={listboxRef}
                id={listboxId}
                role="listbox"
                className="max-h-60 overflow-auto py-1"
                style={{ maxHeight }}
              >
                {filteredOptions.length === 0 ? (
                  <li className="px-4 py-2 text-sm text-gray-500">
                    {searchTerm
                      ? t('common.noResultsFound')
                      : t('common.noOptionsAvailable')}
                  </li>
                ) : (
                  filteredOptions.map((option, index) => {
                    const isSelected = value === option.value;
                    const isHighlighted = index === highlightedIndex;

                    return (
                      <motion.li
                        key={option.value}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={option.disabled}
                        className={classNames(
                          'cursor-pointer px-4 py-2 text-sm transition-colors duration-150',
                          {
                            'bg-blue-600 text-white':
                              isHighlighted && !option.disabled,
                            'border-l-4 border-blue-500 bg-blue-50 text-blue-900':
                              isSelected && !isHighlighted,
                            'text-gray-900 hover:bg-blue-50 hover:text-blue-900':
                              !isSelected && !isHighlighted && !option.disabled,
                            'cursor-not-allowed bg-gray-50 text-gray-400':
                              option.disabled,
                          }
                        )}
                        onClick={() =>
                          !option.disabled && handleSelect(option.value)
                        }
                        onMouseEnter={() =>
                          !option.disabled && setHighlightedIndex(index)
                        }
                        onMouseLeave={() => setHighlightedIndex(-1)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {option.icon && (
                              <span
                                className="flex-shrink-0"
                                aria-hidden="true"
                              >
                                {option.icon}
                              </span>
                            )}
                            <div>
                              <div className="font-medium">
                                {t(option.label)}
                              </div>
                              {option.description && (
                                <div className="text-xs opacity-75">
                                  {t(option.description)}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Selection indicator */}
                          {isSelected && (
                            <motion.svg
                              className="h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </motion.svg>
                          )}
                        </div>
                      </motion.li>
                    );
                  })
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {helperText && !error && (
          <motion.div
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
