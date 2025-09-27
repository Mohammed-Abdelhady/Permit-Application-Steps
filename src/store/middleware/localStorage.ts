import type { Middleware } from '@reduxjs/toolkit';
import type { PersonalInformationFormData } from '../../schemas';
import type { RootState } from '../store';

// Key for localStorage
const REDUX_PERSIST_KEY = 'dge_permit_data';

// Actions that should trigger localStorage save
const PERSIST_ACTIONS = [
  'permit/savePersonalInformation',
  'permit/clearPersonalInformation',
  'permit/clearAllFormData',
];

// Middleware to persist Redux state to localStorage
export const localStorageMiddleware: Middleware = store => next => action => {
  const result = next(action);

  // Save to localStorage after specific actions
  if (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    typeof action.type === 'string' &&
    PERSIST_ACTIONS.includes(action.type)
  ) {
    try {
      const state = store.getState() as RootState;
      const persistData = {
        personalInformation: state.permit.personalInformation,
        timestamp: Date.now(),
      };
      localStorage.setItem(REDUX_PERSIST_KEY, JSON.stringify(persistData));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }

  return result;
};

// Define the persisted state structure
interface PersistedState {
  permit: {
    permits: never[];
    loading: false;
    error: null;
    personalInformation: PersonalInformationFormData | null;
  };
}

// Load persisted state from localStorage
export const loadPersistedState = (): PersistedState | undefined => {
  try {
    const persistedData = localStorage.getItem(REDUX_PERSIST_KEY);
    if (!persistedData) return undefined;

    const parsed = JSON.parse(persistedData);

    // Check if data is not too old (optional: 30 days)
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    if (parsed.timestamp && Date.now() - parsed.timestamp > thirtyDays) {
      localStorage.removeItem(REDUX_PERSIST_KEY);
      return undefined;
    }

    return {
      permit: {
        permits: [],
        loading: false,
        error: null,
        personalInformation: parsed.personalInformation || null,
      },
    };
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
    localStorage.removeItem(REDUX_PERSIST_KEY);
    return undefined;
  }
};

// Clear persisted data from localStorage
export const clearPersistedState = () => {
  try {
    localStorage.removeItem(REDUX_PERSIST_KEY);
  } catch (error) {
    console.warn('Failed to clear localStorage:', error);
  }
};
