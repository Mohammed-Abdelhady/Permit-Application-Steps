import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Zap,
  X,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Edit3,
  Check,
} from 'lucide-react';

interface TextSuggestionPopupProps {
  isOpen: boolean;
  suggestion: string;
  isLoading: boolean;
  error: string | null;
  onAccept: (text: string) => void;
  onEdit: (text: string) => void;
  onDiscard: () => void;
  onClose: () => void;
}

export const TextSuggestionPopup: React.FC<TextSuggestionPopupProps> = ({
  isOpen,
  suggestion,
  isLoading,
  error,
  onAccept,
  onEdit,
  onDiscard,
  onClose,
}) => {
  const { t } = useTranslation();
  const [editedText, setEditedText] = React.useState(suggestion);
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    setEditedText(suggestion);
    setIsEditing(false);
  }, [suggestion]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUseEdited = () => {
    if (editedText.trim()) {
      onEdit(editedText.trim());
    }
  };

  const handleAcceptOriginal = () => {
    onAccept(suggestion);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedText(suggestion);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="bg-opacity-60 fixed inset-0 z-50 flex items-center justify-center bg-black p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('ai.suggestion_title', 'AI Writing Suggestion')}
                </h3>
              </div>
              <motion.button
                type="button"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClose();
                }}
                className="group cursor-pointer rounded-full p-2 text-gray-400 transition-all duration-200 hover:bg-white hover:text-gray-600 hover:shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="max-h-[60vh] overflow-y-auto p-6">
              {isLoading && (
                <motion.div
                  className="flex items-center justify-center py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="text-center">
                    <motion.p
                      className="text-sm font-medium text-gray-600"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {t('form.generating', 'Generating suggestion...')}
                    </motion.p>
                    <div className="mt-4 flex justify-center space-x-1">
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
                </motion.div>
              )}
              {!isLoading && error && (
                <motion.div
                  className="rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-pink-50 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-semibold text-red-800">
                        {t('ai.error_title', 'Error generating suggestion')}
                      </h4>
                      <p className="mt-2 text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </motion.div>
              )}
              {!isLoading && !error && suggestion && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-base font-semibold text-green-800">
                          {t('ai.suggestion_ready', 'AI Suggestion Ready')}
                        </h4>
                        <p className="mt-2 text-sm text-green-700">
                          {t(
                            'ai.suggestion_description',
                            'Review the suggestion below and choose an action.'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {isEditing ? (
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700">
                        {t('ai.edit_suggestion', 'Edit Suggestion')}
                      </label>
                      <textarea
                        value={editedText}
                        onChange={e => setEditedText(e.target.value)}
                        className="block w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3 text-sm leading-relaxed shadow-sm transition-all duration-200 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        rows={8}
                        placeholder={t(
                          'ai.suggestion_placeholder',
                          'Enter your text here...'
                        )}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700">
                        {t('ai.suggested_text', 'Suggested Text')}
                      </label>
                      <div className="rounded-xl border-2 border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-inner">
                        <p className="text-sm leading-relaxed font-medium whitespace-pre-wrap text-gray-800">
                          {suggestion}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Footer Actions */}
            {!isLoading && !error && suggestion && (
              <div className="flex flex-row justify-stretch gap-1 border-t border-gray-200 bg-gray-50 p-4 sm:justify-end sm:gap-4 sm:p-6">
                <motion.button
                  type="button"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDiscard();
                  }}
                  className="group flex flex-1 cursor-pointer items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-3 py-3 text-sm font-semibold text-gray-600 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 focus:ring-4 focus:ring-gray-100 sm:flex-none sm:px-6"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Trash2 className="h-4 w-4 transition-transform group-hover:scale-110 sm:mr-2" />
                  <span className="hidden sm:inline">
                    {t('ai.discard', 'Discard')}
                  </span>
                </motion.button>

                {isEditing ? (
                  <>
                    <motion.button
                      type="button"
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleCancelEdit();
                      }}
                      className="group flex flex-1 cursor-pointer items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-3 py-3 text-sm font-semibold text-gray-600 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 focus:ring-4 focus:ring-gray-100 sm:flex-none sm:px-6"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <X className="h-4 w-4 transition-transform group-hover:scale-110 sm:mr-2" />
                      <span className="hidden sm:inline">
                        {t('common.cancel', 'Cancel')}
                      </span>
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleUseEdited();
                      }}
                      disabled={!editedText.trim()}
                      className="group flex flex-1 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:flex-none sm:px-6"
                      whileHover={
                        editedText.trim() ? { scale: 1.02, y: -1 } : {}
                      }
                      whileTap={editedText.trim() ? { scale: 0.98 } : {}}
                    >
                      <Check className="h-4 w-4 transition-transform group-hover:scale-110 sm:mr-2" />
                      <span className="hidden sm:inline">
                        {t('ai.use_edited', 'Use Edited')}
                      </span>
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.button
                      type="button"
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleEdit();
                      }}
                      className="group flex flex-1 cursor-pointer items-center justify-center rounded-xl border-2 border-blue-500 bg-white px-3 py-3 text-sm font-semibold text-blue-600 shadow-sm transition-all duration-200 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 focus:ring-4 focus:ring-blue-100 sm:flex-none sm:px-6"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Edit3 className="h-4 w-4 transition-transform group-hover:scale-110 sm:mr-2" />
                      <span className="hidden sm:inline">
                        {t('ai.edit', 'Edit')}
                      </span>
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAcceptOriginal();
                      }}
                      className="group flex flex-1 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl focus:ring-4 focus:ring-green-200 sm:flex-none sm:px-6"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <CheckCircle2 className="h-4 w-4 transition-transform group-hover:scale-110 sm:mr-2" />
                      <span className="hidden sm:inline">
                        {t('ai.accept', 'Accept Original')}
                      </span>
                    </motion.button>
                  </>
                )}
              </div>
            )}

            {error && (
              <div className="flex justify-end gap-4 border-t border-gray-200 bg-gray-50 p-6">
                <motion.button
                  type="button"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClose();
                  }}
                  className="group flex cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-gray-700 hover:to-gray-800 hover:shadow-xl focus:ring-4 focus:ring-gray-200"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <X className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  {t('common.close', 'Close')}
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
