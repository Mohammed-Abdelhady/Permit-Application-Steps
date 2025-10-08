import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { type NavigationProps } from '@/types/components';
import { Button } from '@/components';

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
      data-testid="navigation"
      className="flex flex-col gap-4 pt-6 sm:flex-row sm:justify-between sm:gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      {/* Previous Button or Spacer */}
      <div className="order-2 sm:order-1">
        {showPrevious && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Button
              type="button"
              data-testid="previous-button"
              onClick={onPrevious}
              aria-label={t('permit.navigation.previous')}
              variant="secondary"
              colorScheme="gray"
              size="lg"
              fullWidth
              leftIcon={
                isRTL ? (
                  <ChevronRight className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <ChevronLeft className="h-5 w-5 flex-shrink-0" />
                )
              }
              className="min-h-[48px] touch-manipulation whitespace-nowrap sm:w-auto"
              animated={true}
            >
              {t('permit.navigation.previous')}
            </Button>
          </motion.div>
        )}
      </div>

      {/* Next/Submit Buttons */}
      <div className="order-1 flex flex-col gap-3 sm:order-2 sm:flex-row sm:gap-3">
        {showNext && (
          <motion.div
            className="w-full sm:w-auto"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Button
              type="button"
              data-testid="next-button"
              onClick={onNext}
              aria-label={t('permit.navigation.next')}
              variant="primary"
              colorScheme="indigo"
              size="lg"
              fullWidth
              rightIcon={
                isRTL ? (
                  <ChevronLeft className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <ChevronRight className="h-5 w-5 flex-shrink-0" />
                )
              }
              className="min-h-[48px] touch-manipulation whitespace-nowrap sm:w-auto"
              animated={true}
            >
              {t('permit.navigation.next')}
            </Button>
          </motion.div>
        )}

        {showSubmit && (
          <motion.div
            className="w-full sm:w-auto"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Button
              type="submit"
              data-testid="submit-button"
              onClick={onSubmit}
              disabled={isSubmitting}
              aria-label={
                isSubmitting
                  ? t('form.submitting')
                  : t('permit.navigation.submit')
              }
              aria-disabled={isSubmitting}
              variant="success"
              size="lg"
              fullWidth
              leftIcon={<Send className="h-5 w-5 flex-shrink-0" />}
              isLoading={isSubmitting}
              className="min-h-[48px] touch-manipulation whitespace-nowrap sm:w-auto"
              animated={true}
            >
              {isSubmitting
                ? t('form.submitting')
                : t('permit.navigation.submit')}
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Navigation;
