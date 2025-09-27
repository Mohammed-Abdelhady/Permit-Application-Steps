import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface SuggestionDisplayViewProps {
  suggestion: string;
}

const SuggestionDisplayView = ({ suggestion }: SuggestionDisplayViewProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h3
        id="suggested-text-heading"
        className="block text-sm font-semibold text-gray-700"
      >
        {t('ai.suggested_text', 'Suggested Text')}
      </h3>
      <section
        className="rounded-xl border-2 border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-inner"
        aria-labelledby="suggested-text-heading"
      >
        <p className="text-sm leading-relaxed font-medium whitespace-pre-wrap text-gray-800">
          {suggestion}
        </p>
      </section>
    </motion.div>
  );
};

export default SuggestionDisplayView;
