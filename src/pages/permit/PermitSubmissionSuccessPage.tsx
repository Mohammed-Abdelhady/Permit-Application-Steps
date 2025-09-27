import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../store/hooks';
import { AnimatedPageWrapper } from '../../components';
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
            {/* Success Header */}
            <motion.div
              className="mb-8 rounded-2xl bg-white p-8 text-center shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <svg
                  className="h-10 w-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>

              <h1
                className={classNames(
                  'mb-2 text-3xl font-bold text-gray-800',
                  isRTL ? 'text-right' : 'text-left'
                )}
              >
                {t('success.permit_submitted')}
              </h1>

              <p
                className={classNames(
                  'text-lg text-gray-600',
                  isRTL ? 'text-right' : 'text-left'
                )}
              >
                {t('success.permit_submitted_description')}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-sm font-medium text-blue-800">
                    {t('permit.application_id')}
                  </p>
                  <p className="text-xl font-bold text-blue-900">
                    {applicationId}
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-800">
                    {t('permit.submission_date')}
                  </p>
                  <p className="text-xl font-bold text-green-900">
                    {submissionDate}
                  </p>
                </div>
              </div>
            </motion.div>

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
                <motion.div
                  className="rounded-xl bg-white p-6 shadow-md"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h3
                    className={classNames(
                      'mb-4 text-lg font-semibold text-blue-800',
                      isRTL ? 'text-right' : 'text-left'
                    )}
                  >
                    {t('permit.steps.personal')}
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {t('form.fields.name')}
                      </p>
                      <p className="text-gray-800">
                        {personalInformation.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {t('form.fields.nationalId')}
                      </p>
                      <p className="text-gray-800">
                        {personalInformation.nationalId}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {t('form.fields.dateOfBirth')}
                      </p>
                      <p className="text-gray-800">
                        {personalInformation.dateOfBirth
                          ? new Date(
                              personalInformation.dateOfBirth
                            ).toLocaleDateString()
                          : '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {t('form.fields.gender')}
                      </p>
                      <p className="text-gray-800">
                        {personalInformation.gender
                          ? t(`form.gender.${personalInformation.gender}`)
                          : '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {t('form.fields.email')}
                      </p>
                      <p className="text-gray-800">
                        {personalInformation.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {t('form.fields.phone')}
                      </p>
                      <p className="text-gray-800">
                        {personalInformation.phone}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium text-gray-600">
                        {t('form.fields.address')}
                      </p>
                      <p className="text-gray-800">
                        {[
                          personalInformation.address,
                          personalInformation.city,
                          personalInformation.state,
                          personalInformation.country,
                        ]
                          .filter(Boolean)
                          .join(', ')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Family Financial Section */}
              {familyFinancial && (
                <motion.div
                  className="rounded-xl bg-white p-6 shadow-md"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <h3
                    className={classNames(
                      'mb-4 text-lg font-semibold text-blue-800',
                      isRTL ? 'text-right' : 'text-left'
                    )}
                  >
                    {t('permit.steps.familyFinancial')}
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {t('form.fields.maritalStatus')}
                      </p>
                      <p className="text-gray-800">
                        {familyFinancial.maritalStatus
                          ? t(
                              `form.maritalStatus.${familyFinancial.maritalStatus}`
                            )
                          : '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {t('form.fields.dependents')}
                      </p>
                      <p className="text-gray-800">
                        {familyFinancial.dependents}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {t('form.fields.employmentStatus')}
                      </p>
                      <p className="text-gray-800">
                        {familyFinancial.employmentStatus
                          ? t(
                              `form.employmentStatus.${familyFinancial.employmentStatus}`
                            )
                          : '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {t('form.fields.monthlyIncome')}
                      </p>
                      <p className="text-gray-800">
                        ${familyFinancial.monthlyIncome?.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {t('form.fields.housingStatus')}
                      </p>
                      <p className="text-gray-800">
                        {familyFinancial.housingStatus
                          ? t(
                              `form.housingStatus.${familyFinancial.housingStatus}`
                            )
                          : '-'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Situation Description Section */}
              {situationDescription && (
                <motion.div
                  className="rounded-xl bg-white p-6 shadow-md"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <h3
                    className={classNames(
                      'mb-4 text-lg font-semibold text-blue-800',
                      isRTL ? 'text-right' : 'text-left'
                    )}
                  >
                    {t('permit.steps.situation')}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="mb-2 text-sm font-medium text-gray-600">
                        {t('form.fields.currentFinancialSituation')}
                      </p>
                      <p className="rounded-lg bg-gray-50 p-3 whitespace-pre-wrap text-gray-800">
                        {situationDescription.currentFinancialSituation}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium text-gray-600">
                        {t('form.fields.employmentCircumstances')}
                      </p>
                      <p className="rounded-lg bg-gray-50 p-3 whitespace-pre-wrap text-gray-800">
                        {situationDescription.employmentCircumstances}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium text-gray-600">
                        {t('form.fields.reasonForApplying')}
                      </p>
                      <p className="rounded-lg bg-gray-50 p-3 whitespace-pre-wrap text-gray-800">
                        {situationDescription.reasonForApplying}
                      </p>
                    </div>
                  </div>
                </motion.div>
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
