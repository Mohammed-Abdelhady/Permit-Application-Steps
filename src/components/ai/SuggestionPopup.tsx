import { useState, useEffect, useCallback, useId, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SuggestionPopupHeader from './SuggestionPopupHeader';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import SuggestionReadyStatus from './SuggestionReadyStatus';
import SuggestionEditView from './SuggestionEditView';
import SuggestionDisplayView from './SuggestionDisplayView';
import SuggestionPopupActions from './SuggestionPopupActions';
import ErrorActions from './ErrorActions';

interface SuggestionPopupProps {
  isOpen: boolean;
  suggestion: string;
  isLoading: boolean;
  error: string | null;
  onAccept: (suggestion: string) => void;
  onEdit: (suggestion: string) => void;
  onDiscard: () => void;
  onClose: () => void;
}

const SuggestionPopup = ({
  isOpen,
  suggestion,
  isLoading,
  error,
  onAccept,
  onEdit,
  onDiscard,
  onClose,
}: SuggestionPopupProps) => {
  const [editedSuggestion, setEditedSuggestion] = useState(suggestion);
  const [isEditing, setIsEditing] = useState(false);

  // Accessibility IDs
  const dialogId = useId();
  const titleId = useId();
  const descriptionId = useId();
  const errorId = useId();
  const textareaId = useId();

  // Refs for focus management
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // Reset state when suggestion changes
  useEffect(() => {
    setEditedSuggestion(suggestion);
    setIsEditing(false);
  }, [suggestion]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      previouslyFocusedElement.current = document.activeElement as HTMLElement;

      // Focus the dialog after animation completes
      const timer = setTimeout(() => {
        if (isEditing && textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.select();
        } else if (firstFocusableRef.current) {
          firstFocusableRef.current.focus();
        } else if (dialogRef.current) {
          dialogRef.current.focus();
        }
      }, 200);

      return () => clearTimeout(timer);
    } else if (previouslyFocusedElement.current) {
      // Return focus to previously focused element
      previouslyFocusedElement.current.focus();
    }
  }, [isOpen, isEditing]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }

      if (e.key === 'Tab') {
        // Let the browser handle tab navigation within the dialog
        // The focus will be trapped by the dialog's focus management
      }
    },
    [onClose]
  );

  // Optimized handlers with useCallback for performance
  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setEditedSuggestion(suggestion);
  }, [suggestion]);

  const handleSaveEdit = useCallback(() => {
    if (editedSuggestion.trim()) {
      onEdit(editedSuggestion.trim());
      setIsEditing(false);
    }
  }, [editedSuggestion, onEdit]);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    setEditedSuggestion(suggestion);
  }, [suggestion]);

  const handleAccept = useCallback(() => {
    const textToAccept = isEditing ? editedSuggestion.trim() : suggestion;
    if (textToAccept) {
      onAccept(textToAccept);
    }
  }, [isEditing, editedSuggestion, suggestion, onAccept]);

  const handleTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditedSuggestion(e.target.value);
    },
    []
  );

  // Prevent clicks inside dialog from closing it
  const handleDialogClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

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
          aria-hidden="true"
        >
          <motion.div
            ref={dialogRef}
            id={dialogId}
            className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={handleDialogClick}
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={error ? errorId : descriptionId}
            tabIndex={-1}
          >
            <SuggestionPopupHeader titleId={titleId} onClose={onClose} />

            {/* Content */}
            <main className="max-h-[60vh] overflow-y-auto p-6">
              <LoadingState isLoading={isLoading} />

              <ErrorState error={error} errorId={errorId} />

              {suggestion && !isLoading && !error && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <SuggestionReadyStatus descriptionId={descriptionId} />

                  {isEditing ? (
                    <SuggestionEditView
                      editedSuggestion={editedSuggestion}
                      textareaId={textareaId}
                      descriptionId={descriptionId}
                      onTextareaChange={handleTextareaChange}
                      textareaRef={textareaRef}
                    />
                  ) : (
                    <SuggestionDisplayView suggestion={suggestion} />
                  )}
                </motion.div>
              )}
            </main>

            {suggestion && !isLoading && !error && (
              <SuggestionPopupActions
                isEditing={isEditing}
                editedSuggestion={editedSuggestion}
                descriptionId={descriptionId}
                firstFocusableRef={firstFocusableRef}
                onDiscard={onDiscard}
                onEdit={handleEdit}
                onCancelEdit={handleCancelEdit}
                onSaveEdit={handleSaveEdit}
                onAccept={handleAccept}
              />
            )}

            {error && (
              <ErrorActions
                firstFocusableRef={firstFocusableRef}
                onClose={onClose}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuggestionPopup;
