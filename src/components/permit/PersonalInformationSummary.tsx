import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import type { PersonalInformationFormData } from '@/schemas';

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
      className="group relative overflow-hidden rounded-2xl bg-white/90 p-8 shadow-lg ring-1 ring-gray-100 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-xl"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

      <div className="relative">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h3
            className={classNames(
              'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-xl font-bold text-transparent',
              isRTL ? 'text-right' : 'text-left'
            )}
          >
            {t('permit.steps.personal')}
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="group/item relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-4 backdrop-blur-sm transition-all duration-200 hover:from-blue-50 hover:to-indigo-50">
            <div className="mb-2 flex items-center gap-2">
              <svg
                className="h-4 w-4 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <p className="text-sm font-semibold text-blue-700">
                {t('form.fields.name')}
              </p>
            </div>
            <p className="text-lg font-medium text-gray-800">{data.name}</p>
          </div>

          <div className="group/item relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-4 backdrop-blur-sm transition-all duration-200 hover:from-blue-50 hover:to-indigo-50">
            <div className="mb-2 flex items-center gap-2">
              <svg
                className="h-4 w-4 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                />
              </svg>
              <p className="text-sm font-semibold text-blue-700">
                {t('form.fields.nationalId')}
              </p>
            </div>
            <p className="font-mono text-lg font-medium text-gray-800">
              {data.nationalId}
            </p>
          </div>

          <div className="group/item relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-4 backdrop-blur-sm transition-all duration-200 hover:from-blue-50 hover:to-indigo-50">
            <div className="mb-2 flex items-center gap-2">
              <svg
                className="h-4 w-4 text-blue-500"
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
              <p className="text-sm font-semibold text-blue-700">
                {t('form.fields.dateOfBirth')}
              </p>
            </div>
            <p className="text-lg font-medium text-gray-800">
              {data.dateOfBirth
                ? new Date(data.dateOfBirth).toLocaleDateString()
                : '-'}
            </p>
          </div>

          <div className="group/item relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-4 backdrop-blur-sm transition-all duration-200 hover:from-blue-50 hover:to-indigo-50">
            <div className="mb-2 flex items-center gap-2">
              <svg
                className="h-4 w-4 text-blue-500"
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
              <p className="text-sm font-semibold text-blue-700">
                {t('form.fields.gender')}
              </p>
            </div>
            <p className="text-lg font-medium text-gray-800">
              {data.gender ? t(`form.gender.${data.gender}`) : '-'}
            </p>
          </div>

          <div className="group/item relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-4 backdrop-blur-sm transition-all duration-200 hover:from-blue-50 hover:to-indigo-50">
            <div className="mb-2 flex items-center gap-2">
              <svg
                className="h-4 w-4 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm font-semibold text-blue-700">
                {t('form.fields.email')}
              </p>
            </div>
            <p className="text-lg font-medium break-all text-gray-800">
              {data.email}
            </p>
          </div>

          <div className="group/item relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-4 backdrop-blur-sm transition-all duration-200 hover:from-blue-50 hover:to-indigo-50">
            <div className="mb-2 flex items-center gap-2">
              <svg
                className="h-4 w-4 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <p className="text-sm font-semibold text-blue-700">
                {t('form.fields.phone')}
              </p>
            </div>
            <p className="text-lg font-medium text-gray-800">{data.phone}</p>
          </div>

          <div className="group/item relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-4 backdrop-blur-sm transition-all duration-200 hover:from-blue-50 hover:to-indigo-50 md:col-span-2">
            <div className="mb-2 flex items-center gap-2">
              <svg
                className="h-4 w-4 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-sm font-semibold text-blue-700">
                {t('form.fields.address')}
              </p>
            </div>
            <p className="text-lg font-medium text-gray-800">
              {[data.address, data.city, data.state, data.country]
                .filter(Boolean)
                .join(', ')}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
