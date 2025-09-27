import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGetPermitByIdQuery } from '../../store/api/permitApi';
import { AnimatedPageWrapper, Header } from '../../components';
import { SuccessHeader } from '../../components/permit/SuccessHeader';
import { PersonalInformationSummary } from '../../components/permit/PersonalInformationSummary';
import { FamilyFinancialSummary } from '../../components/permit/FamilyFinancialSummary';
import { SituationDescriptionSummary } from '../../components/permit/SituationDescriptionSummary';
import classNames from 'classnames';

const PermitSubmissionSuccessPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { applicationId } = useParams<{ applicationId: string }>();
  const isRTL = i18n.language === 'ar';

  // Fetch permit data using the API
  const {
    data: permitResponse,
    isLoading,
    isError,
  } = useGetPermitByIdQuery(applicationId || '', {
    skip: !applicationId,
  });

  const permitData = permitResponse?.data;

  // Helper function to get progress bar color
  const getProgressColor = () => {
    if (!permitData?.analysis?.validationScore) return 'bg-red-500';
    if (permitData.analysis.validationScore >= 70) return 'bg-green-500';
    if (permitData.analysis.validationScore >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Helper function to get locale string
  const getLocaleString = () => (i18n.language === 'ar' ? 'ar-SA' : 'en-US');

  // Format submission date
  const submissionDate = permitData
    ? new Date(permitData.submissionDate).toLocaleDateString(
        getLocaleString(),
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }
      )
    : '';

  // We'll handle errors by showing error screen instead of redirecting

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleNewApplication = () => {
    navigate('/permit/personal');
  };

  // Loading state
  if (isLoading) {
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
  }

  // Error or no data state
  if (isError || !permitData || !applicationId) {
    const getErrorInfo = () => {
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
                    <p className="mb-2 text-sm text-gray-500">
                      Application ID:
                    </p>
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
  }

  return (
    <AnimatedPageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-2 md:p-4 lg:p-6">
        {/* Header */}
        <Header className="mx-auto mb-4 flex max-w-4xl items-center justify-between md:mb-6 lg:mb-8" />

        <motion.div
          className="mx-auto max-w-4xl px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SuccessHeader
            isRTL={isRTL}
            applicationId={applicationId}
            submissionDate={submissionDate}
          />

          {/* Application Analysis (if available) */}
          {permitData.analysis && (
            <motion.div
              className="mb-6 rounded-lg bg-white p-6 shadow-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3
                className={classNames(
                  'mb-4 text-xl font-semibold text-gray-800',
                  isRTL ? 'text-right' : 'text-left'
                )}
              >
                {t('permit.application_analysis')}
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="text-2xl">📊</div>
                    <span className="font-medium text-gray-700">
                      {t('permit.validation_score')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 flex-1 rounded-full bg-gray-200">
                      <div
                        className={classNames(
                          'h-3 rounded-full transition-all duration-500',
                          getProgressColor()
                        )}
                        style={{
                          width: `${permitData.analysis.validationScore}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-lg font-semibold text-gray-800">
                      {permitData.analysis.validationScore}%
                    </span>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="text-2xl">💡</div>
                    <span className="font-medium text-gray-700">
                      {t('permit.recommendations')}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {permitData.analysis.recommendations.map(
                      (recommendation, index) => (
                        <li
                          key={`recommendation-${index}-${recommendation.slice(0, 20)}`}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <span className="mt-1 text-blue-600">•</span>
                          <span>{recommendation}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* Application Summary */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2
              className={classNames(
                'text-2xl font-semibold text-gray-800',
                isRTL ? 'text-right' : 'text-left'
              )}
            >
              {t('permit.application_summary')}
            </h2>

            {/* Personal Information Section */}
            {permitData.applicationData.personalInformation && (
              <PersonalInformationSummary
                data={permitData.applicationData.personalInformation}
                isRTL={isRTL}
              />
            )}

            {/* Family Financial Section */}
            {permitData.applicationData.familyFinancial && (
              <FamilyFinancialSummary
                data={permitData.applicationData.familyFinancial}
                isRTL={isRTL}
              />
            )}

            {/* Situation Description Section */}
            {permitData.applicationData.situationDescription && (
              <SituationDescriptionSummary
                data={permitData.applicationData.situationDescription}
                isRTL={isRTL}
              />
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className={classNames(
              'mt-8 flex gap-4',
              isRTL ? 'flex-row-reverse' : 'flex-row',
              'flex-col sm:flex-row'
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.button
              onClick={handleBackToHome}
              className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('common.back_to_home')}
            </motion.button>

            <motion.button
              onClick={handleNewApplication}
              className="flex-1 rounded-lg border-2 border-blue-600 bg-white px-6 py-3 font-medium text-blue-600 shadow-md transition-all duration-200 hover:bg-blue-50 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('permit.new_application')}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedPageWrapper>
  );
};

export default PermitSubmissionSuccessPage;
