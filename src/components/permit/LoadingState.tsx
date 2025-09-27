import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AnimatedPageWrapper, Header } from '../../components';

const LoadingState = () => {
  const { t } = useTranslation();

  return (
    <AnimatedPageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-2 md:p-4 lg:p-6">
        {/* Header */}
        <Header className="mx-auto mb-4 flex max-w-4xl items-center justify-between md:mb-6 lg:mb-8" />

        <div className="mx-auto max-w-4xl px-4">
          <motion.div
            className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                <p className="mt-6 text-lg text-gray-600">
                  {t('common.loading')}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Loading application data...
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedPageWrapper>
  );
};

export default LoadingState;
