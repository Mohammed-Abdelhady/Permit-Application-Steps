import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from './api/baseApi';
import { openAIApi } from './api/openAIApi';
import permitReducer from './slices/permitSlice';
import {
  localStorageMiddleware,
  loadPersistedState,
} from './middleware/localStorage';

// Define the root reducer
const rootReducer = {
  permit: permitReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [openAIApi.reducerPath]: openAIApi.reducer,
};

// Load persisted state from localStorage
const preloadedState = loadPersistedState();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    })
      .concat(baseApi.middleware)
      .concat(openAIApi.middleware)
      .concat(localStorageMiddleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<(typeof store)['getState']>;
export type AppDispatch = (typeof store)['dispatch'];
