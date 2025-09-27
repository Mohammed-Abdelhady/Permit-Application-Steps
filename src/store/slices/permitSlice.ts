import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PersonalInformationFormData } from '../../schemas';

export interface Permit {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

interface PermitState {
  permits: Permit[];
  loading: boolean;
  error: string | null;
  // Form data for permit application
  personalInformation: PersonalInformationFormData | null;
}

const initialState: PermitState = {
  permits: [],
  loading: false,
  error: null,
  personalInformation: null,
};

const permitSlice = createSlice({
  name: 'permit',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    setPermits: (state, action: PayloadAction<Permit[]>) => {
      state.permits = action.payload;
    },
    // Form data actions
    savePersonalInformation: (
      state,
      action: PayloadAction<PersonalInformationFormData>
    ) => {
      state.personalInformation = action.payload;
    },
    clearPersonalInformation: state => {
      state.personalInformation = null;
    },
    clearAllFormData: state => {
      state.personalInformation = null;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setPermits,
  savePersonalInformation,
  clearPersonalInformation,
  clearAllFormData,
} = permitSlice.actions;

export default permitSlice.reducer;
