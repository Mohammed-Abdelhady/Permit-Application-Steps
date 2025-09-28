import classNames from 'classnames';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { forwardRef, useId } from 'react';
import { useTranslation } from 'react-i18next';
import { useTextSuggestion } from '../../../hooks/useTextSuggestion';
import { TextSuggestionPopup } from '../../shared/TextSuggestionPopup';

interface FormTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  isRTL?: boolean;
  description?: string;
  onValueChange?: (value: string) => void;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  enableAIHelp?: boolean;
  aiFieldType?: 'financial' | 'employment' | 'reason';
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
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
      resize = 'vertical',
      rows = 4,
      enableAIHelp = false,
      aiFieldType = 'reason',
      value,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation();

    // Generate unique IDs for accessibility
    const textareaId = useId();
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;
    const descriptionId = `${textareaId}-description`;

    // Create aria-describedby string
    const ariaDescribedBy = [
      description && descriptionId,
      helperText && helperId,
      error && errorId,
    ]
      .filter(Boolean)
      .join(' ');

    // Handle textarea changes
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      // Call React Hook Form's onChange
      onChange?.(e);
      // Call custom onValueChange
      onValueChange?.(e.target.value);
    };

    // Handle AI suggestion acceptance
    const handleSuggestionAccepted = (suggestion: string) => {
      // Create a synthetic event to maintain compatibility with React Hook Form
      const syntheticEvent = {
        target: {
          value: suggestion,
          name: props.name || '',
        },
        currentTarget: {
          value: suggestion,
          name: props.name || '',
        },
      } as React.ChangeEvent<HTMLTextAreaElement>;

      onChange?.(syntheticEvent);
      onValueChange?.(suggestion);
    };

    const textSuggestion = useTextSuggestion({
      fieldType: aiFieldType,
      currentValue: (value as string) || '',
      onSuggestionAccepted: handleSuggestionAccepted,
    });

    return (
      <motion.div
        data-testid="form-textarea-container"
        className="space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <label
          data-testid="form-textarea-label"
          htmlFor={textareaId}
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
              data-testid="form-textarea-required"
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
            data-testid="form-textarea-description"
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
          className="relative"
        >
          <textarea
            data-testid="form-textarea-field"
            ref={ref}
            id={textareaId}
            rows={rows}
            value={value}
            onChange={handleChange}
            aria-invalid={error ? 'true' : 'false'}
            aria-required={required ? 'true' : 'false'}
            aria-describedby={ariaDescribedBy || undefined}
            style={{ resize }}
            className={classNames(
              'block w-full rounded-lg border px-3 py-2 text-sm transition-all duration-200 focus:ring-2 focus:outline-none md:px-4 md:py-3 md:text-base',
              {
                'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500':
                  !error,
                'border-red-300 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-500':
                  error,
              },
              enableAIHelp ? 'pb-12 md:pb-14' : '',
              className
            )}
            {...props}
          />

          {enableAIHelp && (
            <motion.button
              data-testid="form-textarea-ai-help"
              type="button"
              onClick={textSuggestion.onHelpMeWrite}
              disabled={textSuggestion.isLoading && !textSuggestion.isPopupOpen}
              className={classNames(
                'group absolute right-2 bottom-2 flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold shadow-lg transition-all duration-200 md:right-3 md:bottom-3 md:px-4 md:py-2.5 md:text-sm',
                {
                  'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl focus:ring-4 focus:ring-blue-200':
                    !(textSuggestion.isLoading && !textSuggestion.isPopupOpen),
                  'cursor-not-allowed bg-gray-300 text-gray-500 shadow-none':
                    textSuggestion.isLoading && !textSuggestion.isPopupOpen,
                }
              )}
              whileHover={
                !(textSuggestion.isLoading && !textSuggestion.isPopupOpen)
                  ? { scale: 1.05, y: -2 }
                  : {}
              }
              whileTap={
                !(textSuggestion.isLoading && !textSuggestion.isPopupOpen)
                  ? { scale: 0.95 }
                  : {}
              }
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              {textSuggestion.isLoading && !textSuggestion.isPopupOpen ? (
                <>
                  <div className="relative">
                    <div className="h-3 w-3 rounded-full border-2 border-gray-400 md:h-4 md:w-4" />
                    <div className="absolute top-0 left-0 h-3 w-3 animate-spin rounded-full border-2 border-transparent border-t-gray-600 md:h-4 md:w-4" />
                  </div>
                  <span className="hidden sm:inline">
                    {t('form.generating')}
                  </span>
                </>
              ) : (
                <>
                  <motion.div whileHover={{ rotate: 15 }}>
                    <Zap className="h-3 w-3 transition-transform duration-200 group-hover:scale-110 md:h-4 md:w-4" />
                  </motion.div>
                  <span className="hidden transition-colors duration-200 group-hover:text-blue-100 sm:inline">
                    {t('form.helpMeWrite')}
                  </span>
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10"
                    transition={{ duration: 0.2 }}
                  />
                </>
              )}
            </motion.button>
          )}
        </motion.div>

        {helperText && !error && (
          <motion.div
            data-testid="form-textarea-helper"
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
            data-testid="form-textarea-error"
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

        {enableAIHelp && (
          <TextSuggestionPopup
            isOpen={textSuggestion.isPopupOpen}
            suggestion={textSuggestion.suggestion}
            isLoading={textSuggestion.isLoading}
            error={textSuggestion.error}
            onAccept={textSuggestion.onAcceptSuggestion}
            onEdit={textSuggestion.onEditSuggestion}
            onDiscard={textSuggestion.onDiscardSuggestion}
            onClose={textSuggestion.onClosePopup}
          />
        )}
      </motion.div>
    );
  }
);

FormTextArea.displayName = 'FormTextArea';

export default FormTextArea;
