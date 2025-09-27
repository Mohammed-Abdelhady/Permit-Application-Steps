import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import type { PersonalInformationFormData } from '../../schemas';

interface PersonalInformationSummaryProps {
  data: PersonalInformationFormData;
  isRTL: boolean;
}

export const PersonalInformationSummary = ({
  data,
  isRTL,
}: PersonalInformationSummaryProps) => {
  const { t } = useTranslation();

  return (
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
          <p className="text-gray-800">{data.name}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">
            {t('form.fields.nationalId')}
          </p>
          <p className="text-gray-800">{data.nationalId}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">
            {t('form.fields.dateOfBirth')}
          </p>
          <p className="text-gray-800">
            {data.dateOfBirth
              ? new Date(data.dateOfBirth).toLocaleDateString()
              : '-'}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">
            {t('form.fields.gender')}
          </p>
          <p className="text-gray-800">
            {data.gender ? t(`form.gender.${data.gender}`) : '-'}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">
            {t('form.fields.email')}
          </p>
          <p className="text-gray-800">{data.email}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">
            {t('form.fields.phone')}
          </p>
          <p className="text-gray-800">{data.phone}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm font-medium text-gray-600">
            {t('form.fields.address')}
          </p>
          <p className="text-gray-800">
            {[data.address, data.city, data.state, data.country]
              .filter(Boolean)
              .join(', ')}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
