import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import type { FamilyFinancialFormData } from '../../schemas';

interface FamilyFinancialSummaryProps {
  data: FamilyFinancialFormData;
  isRTL: boolean;
}

export const FamilyFinancialSummary = ({
  data,
  isRTL,
}: FamilyFinancialSummaryProps) => {
  const { t } = useTranslation();

  return (
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
            {data.maritalStatus
              ? t(`form.maritalStatus.${data.maritalStatus}`)
              : '-'}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">
            {t('form.fields.dependents')}
          </p>
          <p className="text-gray-800">{data.dependents}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">
            {t('form.fields.employmentStatus')}
          </p>
          <p className="text-gray-800">
            {data.employmentStatus
              ? t(`form.employmentStatus.${data.employmentStatus}`)
              : '-'}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">
            {t('form.fields.monthlyIncome')}
          </p>
          <p className="text-gray-800">
            ${data.monthlyIncome?.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">
            {t('form.fields.housingStatus')}
          </p>
          <p className="text-gray-800">
            {data.housingStatus
              ? t(`form.housingStatus.${data.housingStatus}`)
              : '-'}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
