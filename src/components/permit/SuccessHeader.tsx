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
      className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8 text-center shadow-xl ring-1 ring-green-100"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Decorative background elements */}
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-green-200/30 to-emerald-200/30 blur-xl"></div>
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-gradient-to-br from-teal-200/30 to-green-200/30 blur-xl"></div>

      <div className="relative z-10">
        <motion.div
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.4,
            type: 'spring',
            stiffness: 200,
          }}
        >
          <svg
            className="h-12 w-12 text-white drop-shadow-sm"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h1
            data-testid="success-title"
            className={classNames(
              'mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-4xl font-bold text-transparent',
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
        </motion.div>

        <motion.div
          className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="group relative overflow-hidden rounded-2xl bg-white/80 p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="relative">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <svg
                    className="h-4 w-4 text-blue-600"
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
                <p className="text-sm font-semibold text-blue-800">
                  {t('permit.application_id')}
                </p>
              </div>
              <p
                data-testid="application-id"
                className="font-mono text-2xl font-bold tracking-wide text-blue-900"
              >
                {applicationId}
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-white/80 p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="relative">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-4 w-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                    />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-green-800">
                  {t('permit.submission_date')}
                </p>
              </div>
              <p
                data-testid="submission-date"
                className="text-2xl font-bold text-green-900"
              >
                {submissionDate}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
