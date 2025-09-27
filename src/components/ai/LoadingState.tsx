import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  isLoading: boolean;
}

const LoadingState = ({ isLoading }: LoadingStateProps) => {
  const { t } = useTranslation();

  if (!isLoading) return null;

  return (
    <motion.output
      className="flex items-center justify-center py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      aria-live="polite"
      aria-label={t('ai.generating_suggestion', 'Generating suggestion...')}
    >
      <div className="text-center">
        <div className="relative">
          <Loader2
            className="mx-auto h-12 w-12 animate-spin text-blue-600"
            aria-hidden="true"
          />
        </div>
        <motion.p
          className="mt-6 text-sm font-medium text-gray-600"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-hidden="true"
        >
          {t('ai.generating_suggestion', 'Generating suggestion...')}
        </motion.p>
        <div className="mt-4 flex justify-center space-x-1" aria-hidden="true">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-blue-600"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.output>
  );
};

export default LoadingState;
