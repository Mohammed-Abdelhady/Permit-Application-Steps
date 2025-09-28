import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AnimatedPageWrapper, Header } from '@/components';

interface ErrorInfo {
  icon: string;
  title: string;
  description: string;
}

interface ErrorStateProps {
  applicationId?: string;
  isError: boolean;
}

const ErrorState = ({ applicationId, isError }: ErrorStateProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getErrorInfo = (): ErrorInfo => {
    if (!applicationId) {
      return {
        icon: '🔗',
        title: 'Invalid Application Link',
        description:
          'The application link is missing or invalid. Please check the URL and try again.',
      };
    }
    if (isError) {
      return {
        icon: '❌',
        title: 'Error Loading Application',
        description:
          'There was an error loading your application data. Please try again or contact support.',
      };
    }
    return {
      icon: '🔍',
      title: 'Application Not Found',
      description:
        'No application was found with this ID. The application may have been removed or the ID is incorrect.',
    };
  };

  const errorInfo = getErrorInfo();

  return (
    <AnimatedPageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 p-2 md:p-4 lg:p-6">
        {/* Header */}
        <Header className="mx-auto mb-4 flex max-w-4xl items-center justify-between md:mb-6 lg:mb-8" />

        <div className="mx-auto max-w-4xl px-4">
          <motion.div
            className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="py-12 text-center">
              <div className="mb-6 text-6xl">{errorInfo.icon}</div>
              <h1 className="mb-4 text-2xl font-bold text-gray-800">
                {errorInfo.title}
              </h1>
              <p className="mb-8 leading-relaxed text-gray-600">
                {errorInfo.description}
              </p>

              {/* Error Details */}
              {applicationId && (
                <div className="mb-8 rounded-lg bg-gray-50 p-4">
                  <p className="mb-2 text-sm text-gray-500">Application ID:</p>
                  <p className="font-mono text-sm break-all text-gray-700">
                    {applicationId}
                  </p>
                </div>
              )}

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <motion.button
                  onClick={() => navigate('/permit/personal')}
                  className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('permit.start_new_application')}
                </motion.button>

                <motion.button
                  onClick={() => window.location.reload()}
                  className="rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 shadow-md transition-all duration-200 hover:bg-gray-50 hover:shadow-lg focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Try Again
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedPageWrapper>
  );
};

export default ErrorState;
