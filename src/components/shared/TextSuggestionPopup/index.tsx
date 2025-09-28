import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { PopupActions } from './PopupActions';
import { PopupContent } from './PopupContent';
import { PopupHeader } from './PopupHeader';
import type { TextSuggestionPopupProps } from './types';

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

  const handleEditTextChange = (text: string) => {
    setEditedText(text);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          data-testid="text-suggestion-overlay"
          className="bg-opacity-60 fixed inset-0 z-50 flex items-center justify-center bg-black p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            data-testid="text-suggestion-popup"
            className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
          >
            <PopupHeader onClose={onClose} />

            <PopupContent
              isLoading={isLoading}
              error={error}
              suggestion={suggestion}
              editedText={editedText}
              isEditing={isEditing}
              onEditTextChange={handleEditTextChange}
            />

            <PopupActions
              isLoading={isLoading}
              error={error}
              suggestion={suggestion}
              editedText={editedText}
              isEditing={isEditing}
              onDiscard={onDiscard}
              onEdit={handleEdit}
              onUseEdited={handleUseEdited}
              onCancelEdit={handleCancelEdit}
              onAcceptOriginal={handleAcceptOriginal}
              onClose={onClose}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
