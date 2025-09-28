import { motion } from 'framer-motion';
import { X, Zap } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { PopupHeaderProps } from './types';

export const PopupHeader: React.FC<PopupHeaderProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div
      data-testid="popup-header"
      className="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6"
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
            <Zap className="h-4 w-4 text-white" />
          </div>
        </div>
        <h3
          data-testid="popup-title"
          className="text-lg font-semibold text-gray-900"
        >
          {t('ai.suggestion_title', 'AI Writing Suggestion')}
        </h3>
      </div>
      <motion.button
        data-testid="close-button"
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
  );
};
