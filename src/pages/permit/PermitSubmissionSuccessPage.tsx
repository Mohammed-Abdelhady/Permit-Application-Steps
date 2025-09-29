import { AnimatedPageWrapper, Header } from '@/components';
import ActionButtons from '@/components/permit/ActionButtons';
import ApplicationAnalysis from '@/components/permit/ApplicationAnalysis';
import ApplicationSummary from '@/components/permit/ApplicationSummary';
import ErrorState from '@/components/permit/ErrorState';
import LoadingState from '@/components/permit/LoadingState';
import { SuccessHeader } from '@/components/permit/SuccessHeader';
import { useGetPermitByIdQuery } from '@/store/api/permitApi';
import { useAppDispatch } from '@/store/hooks';
import { clearAllFormData } from '@/store/slices/permitSlice';
import { SEO_KEYS, useSEO } from '@/utils/seo';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const PermitSubmissionSuccessPage = () => {
  const { i18n } = useTranslation();
  const { applicationId } = useParams<{ applicationId: string }>();
  const isRTL = i18n.language === 'ar';
  const dispatch = useAppDispatch();

  // Fetch permit data using the API
  const {
    data: permitResponse,
    isLoading,
    isError,
  } = useGetPermitByIdQuery(applicationId || '', {
    skip: !applicationId,
  });

  const permitData = permitResponse?.data;

  // Clear form data when success page loads
  useEffect(() => {
    dispatch(clearAllFormData());
  }, [dispatch]);

  // Set SEO data
  useSEO(SEO_KEYS.success);

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
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/40">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-gradient-to-br from-blue-200/20 to-indigo-200/20 blur-3xl"></div>
          <div
            className="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-gradient-to-br from-emerald-200/20 to-teal-200/20 blur-3xl"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-gradient-to-br from-purple-200/10 to-pink-200/10 blur-3xl"
            style={{ animationDelay: '2s' }}
          ></div>
        </div>

        <div className="relative z-10 p-4 md:p-6 lg:p-8">
          {/* Header */}
          <Header className="mx-auto mb-6 flex max-w-5xl items-center justify-between md:mb-8 lg:mb-10" />

          <motion.div
            className="mx-auto max-w-5xl space-y-8 px-4"
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
      </div>
    </AnimatedPageWrapper>
  );
};

export default PermitSubmissionSuccessPage;
