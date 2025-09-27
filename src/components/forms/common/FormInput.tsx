import { forwardRef, useId } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  isRTL?: boolean;
  description?: string;
  onValueChange?: (value: string) => void;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      className,
      isRTL,
      description,
      onValueChange,
      onChange,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation();

    // Generate unique IDs for accessibility
    const inputId = useId();
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const descriptionId = `${inputId}-description`;

    // Create aria-describedby string
    const ariaDescribedBy = [
      description && descriptionId,
      helperText && helperId,
      error && errorId,
    ]
      .filter(Boolean)
      .join(' ');

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Call React Hook Form's onChange
      onChange?.(e);
      // Call custom onValueChange
      onValueChange?.(e.target.value);
    };

    return (
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <label
          htmlFor={inputId}
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

        <motion.div whileFocus={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
          <input
            ref={ref}
            id={inputId}
            onChange={handleChange}
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
          />
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
);

FormInput.displayName = 'FormInput';

export default FormInput;
