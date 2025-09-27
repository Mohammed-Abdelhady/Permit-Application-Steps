/**
 * Type Definitions for Test Mocks
 */

import type { ReactNode } from 'react';

// Step Data Types
export interface StepData {
  number: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}

// Form Data Types
export interface PersonalInformationData extends Record<string, string> {
  name: string;
  nationalId: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  country: string;
  city: string;
  state: string;
  phone: string;
  email: string;
}

export interface FamilyFinancialData extends Record<string, string | number> {
  maritalStatus: string;
  dependents: number;
  employmentStatus: string;
  monthlyIncome: number;
  housingStatus: string;
}

export interface SituationDescriptionData {
  currentSituation: string;
  reasonForApplication: string;
  additionalInfo: string;
  urgencyLevel: string;
}

// Form State Types
export interface FormState {
  personalInformation: PersonalInformationData | null;
  familyFinancial: FamilyFinancialData | null;
  situationDescription: SituationDescriptionData | null;
}

// Hook Return Types
export interface UsePermitStepsReturn {
  steps: StepData[];
  currentStep: StepData | null;
  nextStep: StepData | null;
  previousStep: StepData | null;
  isFirstStep: boolean;
  isLastStep: boolean;
  goToStep: (stepNumber: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export interface UseToastReturn {
  showToast: (
    message: string,
    type?: 'success' | 'error' | 'warning' | 'info'
  ) => void;
  hideToast: (id: string) => void;
  toasts: Toast[];
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: number;
}

export interface UseNavigationReturn {
  navigate: (path: string) => void;
  goBack: () => void;
  goForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
}

// Redux Types
export interface PermitState {
  personalInformation: PersonalInformationData | null;
  familyFinancial: FamilyFinancialData | null;
  situationDescription: SituationDescriptionData | null;
  isLoading: boolean;
  error: string | null;
  submissionId: string | null;
}

// API Response Types
export interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export interface PermitSubmissionResponse {
  success: boolean;
  submissionId: string;
  message: string;
}

// Error Types
export interface TestError {
  message: string;
  code: string;
  timestamp: string;
}

// User Types
export interface TestUser {
  id: string;
  name: string;
  email: string;
  role: 'applicant' | 'admin' | 'reviewer';
}

// Validation Types
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Translation Types
export interface TranslationMock {
  t: (key: string, options?: Record<string, unknown>) => string;
  i18n: {
    language: string;
    changeLanguage: (lang: string) => Promise<void>;
  };
}

// Router Types
export interface MockLocation {
  pathname: string;
  search: string;
  hash: string;
  state: unknown;
  key: string;
}

export interface MockParams {
  step?: string;
  [key: string]: string | undefined;
}

// Local Storage Types
export interface MockLocalStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
  length: number;
  key: (index: number) => string | null;
}

// Component Props Types
export interface MockComponentProps {
  children?: ReactNode;
  [key: string]: unknown;
}

// Test ID Types
export interface TestIDs {
  page: string;
  form: string;
  sections: {
    personal: string;
    address: string;
    contact: string;
    family: string;
    employment: string;
    housing: string;
  };
  fields: {
    name: string;
    nationalId: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    country: string;
    city: string;
    state: string;
    phone: string;
    email: string;
    maritalStatus: string;
    dependents: string;
    employmentStatus: string;
    monthlyIncome: string;
    housingStatus: string;
  };
  navigation: {
    container: string;
    next: string;
    previous: string;
    submit: string;
  };
}

// Validation Patterns Types
export interface ValidationPatterns {
  email: RegExp;
  phone: RegExp;
  nationalId: RegExp;
  name: RegExp;
}

// Routes Types
export interface Routes {
  personalInformation: string;
  familyFinancial: string;
  situationDescription: string;
}
