import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/store';

/**
 * Custom hook to warn users before leaving the page when they have unsaved form data
 * This prevents accidental data loss when refreshing or navigating away
 */
export const useRefreshWarning = () => {
  const { t } = useTranslation();
  const { personalInformation, familyFinancial, situationDescription } =
    useAppSelector(state => state.permit);

  // Check if there's any unsaved form data
  // We consider data "unsaved" if any form step has data
  const hasUnsavedData = Boolean(
    personalInformation || familyFinancial || situationDescription
  );

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedData) {
        // Standard way to show browser's built-in confirmation dialog
        event.preventDefault();
        // Use localized warning message
        const warningMessage = t('refreshWarning.message');
        return warningMessage;
      }
    };

    // Add event listener for page refresh/close
    if (hasUnsavedData) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    // Cleanup event listener
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedData, t]);

  return { hasUnsavedData };
};
