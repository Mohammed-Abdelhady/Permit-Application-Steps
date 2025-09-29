import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import type { FamilyFinancialFormData } from '@/schemas';

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
      className="group relative overflow-hidden rounded-2xl bg-white/90 p-8 shadow-lg ring-1 ring-gray-100 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-xl"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

      <div className="relative">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100">
            <svg
              className="h-6 w-6 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
          <h3
            className={classNames(
              'bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-xl font-bold text-transparent',
              isRTL ? 'text-right' : 'text-left'
            )}
          >
            {t('permit.steps.familyFinancial')}
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="group/item relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50/50 to-teal-50/50 p-4 backdrop-blur-sm transition-all duration-200 hover:from-emerald-50 hover:to-teal-50">
            <div className="mb-2 flex items-center gap-2">
              <svg
                className="h-4 w-4 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <p className="text-sm font-semibold text-emerald-700">
                {t('form.fields.maritalStatus')}
              </p>
            </div>
            <p className="text-lg font-medium text-gray-800">
              {data.maritalStatus
                ? t(`form.maritalStatus.${data.maritalStatus}`)
                : '-'}
            </p>
          </div>

          <div className="group/item relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50/50 to-teal-50/50 p-4 backdrop-blur-sm transition-all duration-200 hover:from-emerald-50 hover:to-teal-50">
            <div className="mb-2 flex items-center gap-2">
              <svg
                className="h-4 w-4 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              <p className="text-sm font-semibold text-emerald-700">
                {t('form.fields.dependents')}
              </p>
            </div>
            <p className="text-lg font-medium text-gray-800">
              {data.dependents}
            </p>
          </div>

          <div className="group/item relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50/50 to-teal-50/50 p-4 backdrop-blur-sm transition-all duration-200 hover:from-emerald-50 hover:to-teal-50">
            <div className="mb-2 flex items-center gap-2">
              <svg
                className="h-4 w-4 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                />
              </svg>
              <p className="text-sm font-semibold text-emerald-700">
                {t('form.fields.employmentStatus')}
              </p>
            </div>
            <p className="text-lg font-medium text-gray-800">
              {data.employmentStatus
                ? t(`form.employmentStatus.${data.employmentStatus}`)
                : '-'}
            </p>
          </div>

          <div className="group/item relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50/50 to-teal-50/50 p-4 backdrop-blur-sm transition-all duration-200 hover:from-emerald-50 hover:to-teal-50">
            <div className="mb-2 flex items-center gap-2">
              <svg
                className="h-4 w-4 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
              <p className="text-sm font-semibold text-emerald-700">
                {t('form.fields.monthlyIncome')}
              </p>
            </div>
            <p className="text-lg font-medium text-gray-800">
              ${data.monthlyIncome?.toLocaleString()}
            </p>
          </div>

          <div className="group/item relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50/50 to-teal-50/50 p-4 backdrop-blur-sm transition-all duration-200 hover:from-emerald-50 hover:to-teal-50">
            <div className="mb-2 flex items-center gap-2">
              <svg
                className="h-4 w-4 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <p className="text-sm font-semibold text-emerald-700">
                {t('form.fields.housingStatus')}
              </p>
            </div>
            <p className="text-lg font-medium text-gray-800">
              {data.housingStatus
                ? t(`form.housingStatus.${data.housingStatus}`)
                : '-'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
