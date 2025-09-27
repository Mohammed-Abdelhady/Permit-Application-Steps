import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface SuggestionEditViewProps {
  editedSuggestion: string;
  textareaId: string;
  descriptionId: string;
  onTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

const SuggestionEditView = ({
  editedSuggestion,
  textareaId,
  descriptionId,
  onTextareaChange,
  textareaRef,
}: SuggestionEditViewProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <label
        htmlFor={textareaId}
        className="block text-sm font-semibold text-gray-700"
      >
        {t('ai.edit_suggestion', 'Edit Suggestion')}
      </label>
      <textarea
        ref={textareaRef}
        id={textareaId}
        value={editedSuggestion}
        onChange={onTextareaChange}
        className="block w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3 text-sm leading-relaxed shadow-sm transition-all duration-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none"
        rows={8}
        placeholder={t('ai.suggestion_placeholder', 'Enter your text here...')}
        aria-describedby={descriptionId}
        spellCheck={true}
        autoComplete="off"
      />
    </motion.div>
  );
};

export default SuggestionEditView;
