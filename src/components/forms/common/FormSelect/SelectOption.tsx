import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { SelectOptionProps } from './types';

const SelectOption = ({
  option,
  isSelected,
  isHighlighted,
  onSelect,
  onMouseEnter,
  onMouseLeave,
}: SelectOptionProps) => {
  const { t } = useTranslation();

  return (
    <motion.li
      data-testid={`form-select-option-${option.value}`}
      role="option"
      aria-selected={isSelected}
      aria-disabled={option.disabled}
      className={classNames(
        'cursor-pointer px-4 py-2 text-sm transition-colors duration-150',
        {
          'bg-blue-600 text-white': isHighlighted && !option.disabled,
          'border-l-4 border-blue-500 bg-blue-50 text-blue-900':
            isSelected && !isHighlighted,
          'text-gray-900 hover:bg-blue-50 hover:text-blue-900':
            !isSelected && !isHighlighted && !option.disabled,
          'cursor-not-allowed bg-gray-50 text-gray-400': option.disabled,
        }
      )}
      onClick={() => !option.disabled && onSelect(option.value)}
      onMouseEnter={() => !option.disabled && onMouseEnter()}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {option.icon && (
            <span className="flex-shrink-0" aria-hidden="true">
              {option.icon}
            </span>
          )}
          <div>
            <div className="font-medium">{t(option.label)}</div>
            {option.description && (
              <div className="text-xs opacity-75">{t(option.description)}</div>
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
};

export default SelectOption;
