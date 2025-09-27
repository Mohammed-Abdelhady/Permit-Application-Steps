import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  error: string | null;
  errorId: string;
}

const ErrorState = ({ error, errorId }: ErrorStateProps) => {
  const { t } = useTranslation();

  if (!error) return null;

  return (
    <motion.div
      id={errorId}
      className="rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-pink-50 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex">
        <div className="flex-shrink-0" aria-hidden="true">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-5 w-5 text-red-600" />
          </div>
        </div>
        <div className="ml-4">
          <h2 className="text-base font-semibold text-red-800">
            {t('ai.error_title', 'Error generating suggestion')}
          </h2>
          <p className="mt-2 text-sm text-red-700">{error}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ErrorState;
