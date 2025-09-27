import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { ChevronLeft, ChevronRight, Send, Loader2 } from 'lucide-react';
import { type NavigationProps } from '../../types/components';

const Navigation = ({
  onPrevious,
  onNext,
  onSubmit,
  showPrevious = false,
  showNext = false,
  showSubmit = false,
  isSubmitting = false,
}: NavigationProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <motion.div
      className="flex justify-between pt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <div>
        {showPrevious && (
          <motion.button
            type="button"
            onClick={onPrevious}
            aria-label={t('permit.navigation.previous')}
            className={classNames(
              'flex items-center justify-center gap-2',
              'w-24',
              'rounded-lg',
              'border border-gray-300',
              'bg-white',
              'px-4 py-2.5',
              'text-sm font-medium text-gray-700',
              'shadow-sm',
              'transition-all duration-200',
              'hover:border-gray-400 hover:bg-gray-50',
              'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500',
              'focus:outline-none'
            )}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            {isRTL ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
            {t('permit.navigation.previous')}
          </motion.button>
        )}
      </div>
      <div className="flex gap-3">
        {showNext && (
          <motion.button
            type="button"
            onClick={onNext}
            aria-label={t('permit.navigation.next')}
            className={classNames(
              'flex items-center justify-center gap-2',
              'w-24',
              'rounded-lg',
              'bg-indigo-600',
              'px-4 py-2.5',
              'text-sm font-medium text-white',
              'shadow-sm',
              'transition-all duration-200',
              'hover:bg-indigo-700 hover:shadow-md',
              'focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
              'focus:outline-none'
            )}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            {t('permit.navigation.next')}
            {isRTL ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </motion.button>
        )}
        {showSubmit && (
          <motion.button
            type="submit"
            onClick={onSubmit}
            disabled={isSubmitting}
            aria-label={
              isSubmitting
                ? t('form.submitting')
                : t('permit.navigation.submit')
            }
            aria-disabled={isSubmitting}
            className={classNames(
              'flex items-center gap-2',
              'rounded-lg px-4 py-2.5',
              'text-sm font-medium text-white',
              'shadow-sm transition-all duration-200',
              'focus:ring-2 focus:ring-offset-2 focus:outline-none',
              {
                'cursor-not-allowed bg-gray-400 focus:ring-gray-300':
                  isSubmitting,
                'bg-green-600 hover:bg-green-700 hover:shadow-md focus:ring-green-500':
                  !isSubmitting,
              }
            )}
            whileHover={!isSubmitting ? { scale: 1.02, y: -1 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <motion.span
              className="flex items-center gap-2"
              key={isSubmitting ? 'submitting' : 'submit'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {isSubmitting
                ? t('form.submitting')
                : t('permit.navigation.submit')}
            </motion.span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Navigation;
