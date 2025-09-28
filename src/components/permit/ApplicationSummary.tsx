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
      className="space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <h2
        data-testid="summary-title"
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
  );
};

export default ApplicationSummary;
