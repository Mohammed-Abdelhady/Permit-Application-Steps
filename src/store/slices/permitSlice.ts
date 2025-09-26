import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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
}

const initialState: PermitState = {
  permits: [],
  loading: false,
  error: null,
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
  },
});

export const { setLoading, setError, clearError, setPermits } =
  permitSlice.actions;

export default permitSlice.reducer;
