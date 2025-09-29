import type { StoredPermitData } from '@/store/types/permit';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ApplicationAnalysisProps {
  permitData: StoredPermitData;
  isRTL: boolean;
}

const ApplicationAnalysis = ({
  permitData,
  isRTL,
}: ApplicationAnalysisProps) => {
  const { t } = useTranslation();

  // Helper function to get progress bar color
  const getProgressColor = () => {
    if (!permitData?.analysis?.validationScore) return 'bg-red-500';
    if (permitData.analysis.validationScore >= 70) return 'bg-green-500';
    if (permitData.analysis.validationScore >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (!permitData.analysis) {
    return null;
  }

  return (
    <motion.div
      data-testid="application-analysis"
      className="mb-8 overflow-hidden rounded-2xl bg-white/80 p-8 shadow-lg ring-1 ring-gray-100 backdrop-blur-sm"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100">
          <svg
            className="h-6 w-6 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h3
          data-testid="analysis-title"
          className={classNames(
            'text-2xl font-bold text-gray-800',
            isRTL ? 'text-right' : 'text-left'
          )}
        >
          {t('permit.application_analysis')}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Validation Score Section */}
        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 ring-1 ring-blue-100">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <svg
                className="h-5 w-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-lg font-semibold text-blue-800">
              {t('permit.validation_score')}
            </span>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <div className="h-4 w-full rounded-full bg-white/60 shadow-inner">
                <motion.div
                  className={classNames(
                    'h-4 rounded-full shadow-sm',
                    getProgressColor()
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${permitData.analysis.validationScore}%` }}
                  transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                ></motion.div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-gray-700">
                  {permitData.analysis.validationScore}%
                </span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-3xl font-bold text-blue-900">
                {permitData.analysis.validationScore}%
              </span>
              <p className="mt-1 text-sm text-blue-700">
                {permitData.analysis.validationScore >= 70
                  ? 'Excellent Application'
                  : permitData.analysis.validationScore >= 50
                    ? 'Good Application'
                    : 'Needs Improvement'}
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 p-6 ring-1 ring-emerald-100">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
              <svg
                className="h-5 w-5 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <span className="text-lg font-semibold text-emerald-800">
              {t('permit.recommendations')}
            </span>
          </div>

          <div className="max-h-64 space-y-3 overflow-y-auto">
            {permitData.analysis.recommendations &&
            permitData.analysis.recommendations.length > 0 ? (
              permitData.analysis.recommendations.map(
                (recommendation, index) => (
                  <motion.div
                    key={`recommendation-${index}-${recommendation.slice(0, 20)}`}
                    className="flex items-start gap-3 rounded-lg bg-white/70 p-3 backdrop-blur-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-600">
                      {index + 1}
                    </div>
                    <span className="text-sm leading-relaxed text-gray-700">
                      {recommendation}
                    </span>
                  </motion.div>
                )
              )
            ) : (
              <div className="flex items-center justify-center p-6">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-emerald-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-emerald-600">
                    No specific recommendations at this time
                  </p>
                  <p className="text-xs text-emerald-500">
                    Your application looks good!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ApplicationAnalysis;
