import type { StoredPermitData } from './types';
import { PERMITS_STORAGE_KEY } from './constants';

// Optimized localStorage utility functions
export const StorageUtils = {
  savePermit(permit: StoredPermitData): boolean {
    try {
      const existingPermits = this.getPermits();
      const updatedPermits = [...existingPermits, permit];
      localStorage.setItem(PERMITS_STORAGE_KEY, JSON.stringify(updatedPermits));
      return true;
    } catch (error) {
      console.error('Error saving permit to localStorage:', error);
      return false;
    }
  },

  getPermits(): StoredPermitData[] {
    try {
      const stored = localStorage.getItem(PERMITS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading permits from localStorage:', error);
      return [];
    }
  },

  getPermitById(applicationId: string): StoredPermitData | null {
    try {
      const permits = this.getPermits();
      return (
        permits.find(permit => permit.applicationId === applicationId) ?? null
      );
    } catch (error) {
      console.error('Error finding permit by ID:', error);
      return null;
    }
  },
};
