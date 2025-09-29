import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FamilyFinancialSummary } from './FamilyFinancialSummary';
import { PersonalInformationSummary } from './PersonalInformationSummary';
import { SituationDescriptionSummary } from './SituationDescriptionSummary';

import type { StoredPermitData } from '@/store/types/permit';

interface ApplicationSummaryProps {
  permitData: StoredPermitData;
  isRTL: boolean;
}

const ApplicationSummary = ({ permitData, isRTL }: ApplicationSummaryProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      data-testid="application-summary"
      className="space-y-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100">
          <svg
            className="h-7 w-7 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h2
          data-testid="summary-title"
          className={classNames(
            'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent',
            isRTL ? 'text-right' : 'text-left'
          )}
        >
          {t('permit.application_summary')}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Personal Information Section */}
        {permitData.applicationData.personalInformation && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <PersonalInformationSummary
              data={permitData.applicationData.personalInformation}
              isRTL={isRTL}
            />
          </motion.div>
        )}

        {/* Family Financial Section */}
        {permitData.applicationData.familyFinancial && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <FamilyFinancialSummary
              data={permitData.applicationData.familyFinancial}
              isRTL={isRTL}
            />
          </motion.div>
        )}

        {/* Situation Description Section */}
        {permitData.applicationData.situationDescription && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <SituationDescriptionSummary
              data={permitData.applicationData.situationDescription}
              isRTL={isRTL}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ApplicationSummary;
