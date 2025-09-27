import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Zap, X } from 'lucide-react';

interface SuggestionPopupHeaderProps {
  titleId: string;
  onClose: () => void;
}

const SuggestionPopupHeader = ({
  titleId,
  onClose,
}: SuggestionPopupHeaderProps) => {
  const { t } = useTranslation();

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0" aria-hidden="true">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
            <Zap className="h-4 w-4 text-white" />
          </div>
        </div>
        <h1 id={titleId} className="text-lg font-semibold text-gray-900">
          {t('ai.suggestion_title', 'AI Writing Suggestion')}
        </h1>
      </div>
      <motion.button
        type="button"
        onClick={onClose}
        className="group cursor-pointer rounded-full p-2 text-gray-400 transition-all duration-200 hover:bg-white hover:text-gray-600 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t('common.close', 'Close dialog')}
      >
        <X
          className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90"
          aria-hidden="true"
        />
      </motion.button>
    </header>
  );
};

export default SuggestionPopupHeader;
