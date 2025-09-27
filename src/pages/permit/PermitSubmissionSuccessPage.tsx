import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../store/hooks';
import { AnimatedPageWrapper } from '../../components';
import { SuccessHeader } from '../../components/permit/SuccessHeader';
import { PersonalInformationSummary } from '../../components/permit/PersonalInformationSummary';
import { FamilyFinancialSummary } from '../../components/permit/FamilyFinancialSummary';
import { SituationDescriptionSummary } from '../../components/permit/SituationDescriptionSummary';
import classNames from 'classnames';

const PermitSubmissionSuccessPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';

  // Get all form data from Redux
  const personalInformation = useAppSelector(
    state => state.permit.personalInformation
  );
  const familyFinancial = useAppSelector(state => state.permit.familyFinancial);
  const situationDescription = useAppSelector(
    state => state.permit.situationDescription
  );

  // Generate a mock application ID
  const applicationId = `DGE-${Date.now().toString().slice(-8)}`;
  const submissionDate = new Date().toLocaleDateString(
    i18n.language === 'ar' ? 'ar-SA' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  // Redirect if no form data exists
  useEffect(() => {
    if (!personalInformation && !familyFinancial && !situationDescription) {
      navigate('/permit/personal');
    }
  }, [personalInformation, familyFinancial, situationDescription, navigate]);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleNewApplication = () => {
    navigate('/permit/personal');
  };

  if (!personalInformation && !familyFinancial && !situationDescription) {
    return null;
  }

  return (
    <AnimatedPageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
        <div className="container mx-auto px-4">
          <motion.div
            className="mx-auto max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SuccessHeader
              isRTL={isRTL}
              applicationId={applicationId}
              submissionDate={submissionDate}
            />

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
              {personalInformation && (
                <PersonalInformationSummary
                  data={personalInformation}
                  isRTL={isRTL}
                />
              )}

              {/* Family Financial Section */}
              {familyFinancial && (
                <FamilyFinancialSummary data={familyFinancial} isRTL={isRTL} />
              )}

              {/* Situation Description Section */}
              {situationDescription && (
                <SituationDescriptionSummary
                  data={situationDescription}
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
      </div>
    </AnimatedPageWrapper>
  );
};

export default PermitSubmissionSuccessPage;
