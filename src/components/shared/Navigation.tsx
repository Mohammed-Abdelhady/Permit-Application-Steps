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
      className="flex justify-between pt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <div>
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
              leftIcon={
                isRTL ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )
              }
              className="whitespace-nowrap"
              animated={true}
            >
              {t('permit.navigation.previous')}
            </Button>
          </motion.div>
        )}
      </div>

      <div className="flex flex-shrink-0 gap-3">
        {showNext && (
          <motion.div
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
              rightIcon={
                isRTL ? (
                  <ChevronLeft className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )
              }
              className="whitespace-nowrap"
              animated={true}
            >
              {t('permit.navigation.next')}
            </Button>
          </motion.div>
        )}

        {showSubmit && (
          <motion.div
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
              leftIcon={<Send className="h-4 w-4" />}
              isLoading={isSubmitting}
              className="whitespace-nowrap"
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
