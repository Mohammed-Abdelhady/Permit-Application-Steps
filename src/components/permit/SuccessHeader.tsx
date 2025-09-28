import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface SuccessHeaderProps {
  isRTL: boolean;
  applicationId: string;
  submissionDate: string;
}

export const SuccessHeader = ({
  isRTL,
  applicationId,
  submissionDate,
}: SuccessHeaderProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      data-testid="success-header"
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
        data-testid="success-title"
        className={classNames(
          'mb-2 text-3xl font-bold text-gray-800',
          isRTL ? 'text-right' : 'text-left'
        )}
      >
        {t('success.permit_submitted')}
      </h1>

      <p
        data-testid="success-description"
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
          <p
            data-testid="application-id"
            className="text-xl font-bold text-blue-900"
          >
            {applicationId}
          </p>
        </div>
        <div className="rounded-lg bg-green-50 p-4">
          <p className="text-sm font-medium text-green-800">
            {t('permit.submission_date')}
          </p>
          <p
            data-testid="submission-date"
            className="text-xl font-bold text-green-900"
          >
            {submissionDate}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
