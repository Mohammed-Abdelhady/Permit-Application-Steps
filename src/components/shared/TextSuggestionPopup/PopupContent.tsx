import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { PopupContentProps } from './types';

export const PopupContent: React.FC<PopupContentProps> = ({
  isLoading,
  error,
  suggestion,
  editedText,
  isEditing,
  onEditTextChange,
}) => {
  const { t } = useTranslation();

  return (
    <div
      data-testid="popup-content"
      className="max-h-[60vh] overflow-y-auto p-6"
    >
      {isLoading && (
        <motion.div
          data-testid="loading-state"
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
          data-testid="error-state"
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
          data-testid="suggestion-content"
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
                data-testid="edit-textarea"
                value={editedText}
                onChange={e => onEditTextChange(e.target.value)}
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
              <div
                data-testid="suggestion-display"
                className="rounded-xl border-2 border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-inner"
              >
                <p className="text-sm leading-relaxed font-medium whitespace-pre-wrap text-gray-800">
                  {suggestion}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};
