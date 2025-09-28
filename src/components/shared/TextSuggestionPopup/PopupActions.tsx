import { motion } from 'framer-motion';
import { Check, CheckCircle2, Edit3, Trash2, X } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { PopupActionsProps } from './types';

export const PopupActions: React.FC<PopupActionsProps> = ({
  isLoading,
  error,
  suggestion,
  editedText,
  isEditing,
  onDiscard,
  onEdit,
  onUseEdited,
  onCancelEdit,
  onAcceptOriginal,
  onClose,
}) => {
  const { t } = useTranslation();

  if (error) {
    return (
      <div className="flex justify-end gap-4 border-t border-gray-200 bg-gray-50 p-6">
        <motion.button
          data-testid="error-close-button"
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
    );
  }

  if (!isLoading && !error && suggestion) {
    return (
      <div
        data-testid="popup-actions"
        className="flex flex-row justify-stretch gap-1 border-t border-gray-200 bg-gray-50 p-4 sm:justify-end sm:gap-4 sm:p-6"
      >
        <motion.button
          data-testid="discard-button"
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
          <span className="hidden sm:inline">{t('ai.discard', 'Discard')}</span>
        </motion.button>

        {isEditing ? (
          <>
            <motion.button
              data-testid="cancel-edit-button"
              type="button"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onCancelEdit();
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
              data-testid="use-edited-button"
              type="button"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onUseEdited();
              }}
              disabled={!editedText.trim()}
              className="group flex flex-1 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:flex-none sm:px-6"
              whileHover={editedText.trim() ? { scale: 1.02, y: -1 } : {}}
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
              data-testid="edit-button"
              type="button"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onEdit();
              }}
              className="group flex flex-1 cursor-pointer items-center justify-center rounded-xl border-2 border-blue-500 bg-white px-3 py-3 text-sm font-semibold text-blue-600 shadow-sm transition-all duration-200 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 focus:ring-4 focus:ring-blue-100 sm:flex-none sm:px-6"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Edit3 className="h-4 w-4 transition-transform group-hover:scale-110 sm:mr-2" />
              <span className="hidden sm:inline">{t('ai.edit', 'Edit')}</span>
            </motion.button>
            <motion.button
              data-testid="accept-button"
              type="button"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onAcceptOriginal();
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
    );
  }

  return null;
};
