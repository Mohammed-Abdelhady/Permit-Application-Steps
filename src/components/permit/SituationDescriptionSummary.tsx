import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import type { SituationDescriptionFormData } from '../../schemas';

interface SituationDescriptionSummaryProps {
  data: SituationDescriptionFormData;
  isRTL: boolean;
}

export const SituationDescriptionSummary = ({
  data,
  isRTL,
}: SituationDescriptionSummaryProps) => {
  const { t } = useTranslation();

  return (
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
            {data.currentFinancialSituation}
          </p>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-gray-600">
            {t('form.fields.employmentCircumstances')}
          </p>
          <p className="rounded-lg bg-gray-50 p-3 whitespace-pre-wrap text-gray-800">
            {data.employmentCircumstances}
          </p>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-gray-600">
            {t('form.fields.reasonForApplying')}
          </p>
          <p className="rounded-lg bg-gray-50 p-3 whitespace-pre-wrap text-gray-800">
            {data.reasonForApplying}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
