import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import type { StoredPermitData } from '../../store/api/types';

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
      className="mb-6 rounded-lg bg-white p-6 shadow-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h3
        className={classNames(
          'mb-4 text-xl font-semibold text-gray-800',
          isRTL ? 'text-right' : 'text-left'
        )}
      >
        {t('permit.application_analysis')}
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="text-2xl">📊</div>
            <span className="font-medium text-gray-700">
              {t('permit.validation_score')}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-3 flex-1 rounded-full bg-gray-200">
              <div
                className={classNames(
                  'h-3 rounded-full transition-all duration-500',
                  getProgressColor()
                )}
                style={{
                  width: `${permitData.analysis.validationScore}%`,
                }}
              ></div>
            </div>
            <span className="text-lg font-semibold text-gray-800">
              {permitData.analysis.validationScore}%
            </span>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="text-2xl">💡</div>
            <span className="font-medium text-gray-700">
              {t('permit.recommendations')}
            </span>
          </div>
          <ul className="space-y-1">
            {permitData.analysis.recommendations.map(
              (recommendation, index) => (
                <li
                  key={`recommendation-${index}-${recommendation.slice(0, 20)}`}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <span className="mt-1 text-blue-600">•</span>
                  <span>{recommendation}</span>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ApplicationAnalysis;
