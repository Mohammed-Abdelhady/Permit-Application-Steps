import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useGetPermitByIdQuery } from '../../store/api/permitApi';
import { AnimatedPageWrapper, Header } from '../../components';
import { SuccessHeader } from '../../components/permit/SuccessHeader';
import LoadingState from '../../components/permit/LoadingState';
import ErrorState from '../../components/permit/ErrorState';
import ApplicationAnalysis from '../../components/permit/ApplicationAnalysis';
import ApplicationSummary from '../../components/permit/ApplicationSummary';
import ActionButtons from '../../components/permit/ActionButtons';

const PermitSubmissionSuccessPageOptimized = () => {
  const { i18n } = useTranslation();
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

  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Error or no data state
  if (isError || !permitData || !applicationId) {
    return <ErrorState applicationId={applicationId} isError={isError} />;
  }

  // Success state
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
          {/* Success Header */}
          <SuccessHeader
            isRTL={isRTL}
            applicationId={applicationId}
            submissionDate={submissionDate}
          />

          {/* Application Analysis */}
          <ApplicationAnalysis permitData={permitData} isRTL={isRTL} />

          {/* Application Summary */}
          <ApplicationSummary permitData={permitData} isRTL={isRTL} />

          {/* Action Buttons */}
          <ActionButtons isRTL={isRTL} />
        </motion.div>
      </div>
    </AnimatedPageWrapper>
  );
};

export default PermitSubmissionSuccessPageOptimized;
