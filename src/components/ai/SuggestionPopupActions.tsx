import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Trash2, Edit3, Check, X } from 'lucide-react';

interface SuggestionPopupActionsProps {
  isEditing: boolean;
  editedSuggestion: string;
  descriptionId: string;
  firstFocusableRef: React.RefObject<HTMLButtonElement | null>;
  onDiscard: () => void;
  onEdit: () => void;
  onCancelEdit: () => void;
  onSaveEdit: () => void;
  onAccept: () => void;
}

const SuggestionPopupActions = ({
  isEditing,
  editedSuggestion,
  descriptionId,
  firstFocusableRef,
  onDiscard,
  onEdit,
  onCancelEdit,
  onSaveEdit,
  onAccept,
}: SuggestionPopupActionsProps) => {
  const { t } = useTranslation();

  return (
    <footer className="flex flex-col justify-end gap-4 border-t border-gray-200 bg-gray-50 p-6 sm:flex-row">
      <motion.button
        type="button"
        onClick={onDiscard}
        className="group flex cursor-pointer items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-600 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        aria-describedby={descriptionId}
      >
        <Trash2
          className="mr-2 h-4 w-4 transition-transform group-hover:scale-110"
          aria-hidden="true"
        />
        {t('ai.discard', 'Discard')}
      </motion.button>

      {isEditing ? (
        <>
          <motion.button
            type="button"
            onClick={onCancelEdit}
            className="group flex cursor-pointer items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-600 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <X
              className="mr-2 h-4 w-4 transition-transform group-hover:scale-110"
              aria-hidden="true"
            />
            {t('common.cancel', 'Cancel')}
          </motion.button>
          <motion.button
            type="button"
            onClick={onSaveEdit}
            disabled={!editedSuggestion.trim()}
            className="group flex cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:from-blue-600 disabled:hover:to-indigo-600"
            whileHover={editedSuggestion.trim() ? { scale: 1.02, y: -1 } : {}}
            whileTap={editedSuggestion.trim() ? { scale: 0.98 } : {}}
            ref={firstFocusableRef}
          >
            <Check
              className="mr-2 h-4 w-4 transition-transform group-hover:scale-110"
              aria-hidden="true"
            />
            {t('ai.save_changes', 'Save Changes')}
          </motion.button>
        </>
      ) : (
        <>
          <motion.button
            type="button"
            onClick={onEdit}
            className="group flex cursor-pointer items-center justify-center rounded-xl border-2 border-blue-500 bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm transition-all duration-200 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            ref={firstFocusableRef}
          >
            <Edit3
              className="mr-2 h-4 w-4 transition-transform group-hover:scale-110"
              aria-hidden="true"
            />
            {t('ai.edit', 'Edit')}
          </motion.button>
          <motion.button
            type="button"
            onClick={onAccept}
            className="group flex cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <Check
              className="mr-2 h-4 w-4 transition-transform group-hover:scale-110"
              aria-hidden="true"
            />
            {t('ai.accept', 'Accept')}
          </motion.button>
        </>
      )}
    </footer>
  );
};

export default SuggestionPopupActions;
