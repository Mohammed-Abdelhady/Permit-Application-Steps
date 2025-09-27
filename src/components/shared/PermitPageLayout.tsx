import { motion } from 'framer-motion';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import {
  ProgressIndicator,
  Navigation,
  AnimatedPageWrapper,
  Header,
} from '../index';
import { type PermitPageLayoutProps } from '../../types/components';

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
      className={classNames(
        'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4',
        {
          rtl: isRTL,
          ltr: !isRTL,
        }
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <Header className="mx-auto mb-8 flex max-w-4xl items-center justify-between" />

      {/* Main Content */}
      <div className="mx-auto max-w-4xl">
        <AnimatedPageWrapper direction={normalizedDirection}>
          <motion.div
            className={classNames(
              'mx-auto',
              'max-w-2xl',
              'rounded-xl',
              'bg-white',
              'p-8',
              'shadow-lg',
              containerClassName
            )}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            whileHover={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
          >
            <motion.h2
              className="mb-6 text-2xl font-bold text-gray-800"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {title}
            </motion.h2>

            <ProgressIndicator steps={steps} currentStep={currentStep} />

            <motion.div
              className={classNames(
                'mb-8',
                'space-y-4',
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
