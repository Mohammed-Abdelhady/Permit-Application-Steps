import {
  AnimatedPageWrapper,
  Header,
  Navigation,
  ProgressIndicator,
} from '@/components';
import { type PermitPageLayoutProps } from '@/types/components';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const PermitPageLayout = ({
  children,
  title,
  currentStep,
  steps,
  direction = 'forward',
  showPrevious = false,
  showNext = false,
  showSubmit = false,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting = false,
  containerClassName,
  contentClassName,
}: PermitPageLayoutProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const normalizedDirection = direction === 'none' ? 'forward' : direction;

  return (
    <div
      data-testid="permit-page-layout"
      className={classNames(
        'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 md:p-4 lg:p-6',
        {
          rtl: isRTL,
          ltr: !isRTL,
        }
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <Header className="mx-auto mb-4 flex max-w-4xl items-center justify-between md:mb-6 lg:mb-8" />

      {/* Main Content */}
      <div className="mx-auto max-w-4xl">
        <AnimatedPageWrapper direction={normalizedDirection}>
          <motion.div
            data-testid="permit-page-content"
            className={classNames(
              'mx-auto',
              'max-w-4xl',
              'rounded-xl',
              'bg-white',
              'p-4 md:p-6 lg:p-8 xl:p-10',
              'shadow-lg',
              containerClassName
            )}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            whileHover={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
          >
            <motion.h2
              data-testid="page-title"
              className="mb-4 text-xl font-bold text-gray-800 md:mb-6 md:text-2xl lg:text-3xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {title}
            </motion.h2>

            <ProgressIndicator steps={steps} currentStep={currentStep} />

            <motion.div
              data-testid="form-content"
              className={classNames(
                'mb-6 md:mb-8',
                'space-y-4 md:space-y-6',
                {
                  'opacity-50': isSubmitting,
                  'pointer-events-none': isSubmitting,
                },
                contentClassName
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              {children}
            </motion.div>

            <Navigation
              showPrevious={showPrevious}
              showNext={showNext}
              showSubmit={showSubmit}
              onPrevious={onPrevious}
              onNext={onNext}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
            />
          </motion.div>
        </AnimatedPageWrapper>
      </div>
    </div>
  );
};

export default PermitPageLayout;
