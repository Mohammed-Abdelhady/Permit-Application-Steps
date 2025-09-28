import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { SelectTriggerProps } from './types';

const SelectTrigger = ({
  isOpen,
  displayValue,
  selectedOption,
  clearable,
  error,
  required,
  ariaDescribedBy,
  onToggle,
  onClear,
  onKeyDown,
  onBlur,
}: SelectTriggerProps) => {
  const { t } = useTranslation();

  return (
    <motion.button
      data-testid="form-select-trigger"
      type="button"
      onClick={onToggle}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
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
          data-testid="form-select-display-text"
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
            <motion.div
              data-testid="form-select-clear-button"
              role="button"
              tabIndex={0}
              onClick={onClear}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClear(e as React.MouseEvent);
                }
              }}
              className="cursor-pointer rounded p-1 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            </motion.div>
          )}

          {/* Dropdown arrow */}
          <motion.svg
            data-testid="form-select-dropdown-icon"
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
  );
};

export default SelectTrigger;
