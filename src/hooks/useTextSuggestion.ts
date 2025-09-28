import { useState, useCallback } from 'react';
import { useGenerateTextSuggestionMutation } from '@/store/api';

export interface UseTextSuggestionProps {
  fieldType: 'financial' | 'employment' | 'reason';
  currentValue: string;
  onSuggestionAccepted: (text: string) => void;
}

export const useTextSuggestion = ({
  fieldType,
  currentValue,
  onSuggestionAccepted,
}: UseTextSuggestionProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  const [generateSuggestion, { isLoading, error }] =
    useGenerateTextSuggestionMutation();

  const handleHelpMeWrite = useCallback(async () => {
    setIsPopupOpen(true);
    setSuggestion('');

    try {
      const result = await generateSuggestion({
        fieldType,
        currentText: currentValue.trim(),
      }).unwrap();

      setSuggestion(result.suggestion);
    } catch (err) {
      // Error is handled by RTK Query
      console.error('Failed to generate suggestion:', err);
    }
  }, [generateSuggestion, fieldType, currentValue]);

  const handleAcceptSuggestion = useCallback(
    (text: string) => {
      if (text) {
        onSuggestionAccepted(text);
        setIsPopupOpen(false);
        setSuggestion('');
      }
    },
    [onSuggestionAccepted]
  );

  const handleEditSuggestion = useCallback(
    (editedText: string) => {
      if (editedText.trim()) {
        onSuggestionAccepted(editedText.trim());
        setIsPopupOpen(false);
        setSuggestion('');
      }
    },
    [onSuggestionAccepted]
  );

  const handleDiscardSuggestion = useCallback(() => {
    setIsPopupOpen(false);
    setSuggestion('');
  }, []);

  const handleClosePopup = useCallback(() => {
    setIsPopupOpen(false);
    setSuggestion('');
  }, []);

  return {
    isPopupOpen,
    suggestion,
    isLoading,
    error: error
      ? (error as { message?: string }).message || 'An error occurred'
      : null,
    onHelpMeWrite: handleHelpMeWrite,
    onAcceptSuggestion: handleAcceptSuggestion,
    onEditSuggestion: handleEditSuggestion,
    onDiscardSuggestion: handleDiscardSuggestion,
    onClosePopup: handleClosePopup,
  };
};
