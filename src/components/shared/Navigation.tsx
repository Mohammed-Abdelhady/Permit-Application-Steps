import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import classNames from 'classnames';
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
  const { t } = useTranslation();

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
              'rounded-lg',
              'border',
              'border-gray-300',
              'bg-white',
              'px-6',
              'py-2',
              'text-gray-700',
              'transition-all',
              'hover:bg-gray-50',
              'focus:ring-2',
              'focus:ring-indigo-500',
              'focus:outline-none'
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            {t('permit.navigation.previous')}
          </motion.button>
        )}
      </div>
      <div className="flex space-x-4">
        {showNext && (
          <motion.button
            type="button"
            onClick={onNext}
            aria-label={t('permit.navigation.next')}
            className={classNames(
              'rounded-lg',
              'bg-indigo-600',
              'px-6',
              'py-2',
              'text-white',
              'transition-all',
              'hover:bg-indigo-700',
              'focus:ring-2',
              'focus:ring-indigo-500',
              'focus:outline-none'
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            {t('permit.navigation.next')}
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
              'rounded-lg px-6 py-2 text-white transition-all focus:ring-2 focus:outline-none',
              {
                'cursor-not-allowed bg-gray-400 focus:ring-gray-300':
                  isSubmitting,
                'bg-green-600 hover:bg-green-700 focus:ring-green-500':
                  !isSubmitting,
              }
            )}
            whileHover={!isSubmitting ? { scale: 1.05 } : {}}
            whileTap={!isSubmitting ? { scale: 0.95 } : {}}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <motion.span
              key={isSubmitting ? 'submitting' : 'submit'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
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
