/**
 * Test Mocks - Centralized Mock Definitions
 *
 * This file contains all mock implementations used across test files.
 * Centralizing mocks helps maintain consistency and reduces duplication.
 */

import { vi } from 'vitest';
import type {
  StepData,
  PersonalInformationData,
  UsePermitStepsReturn,
  UseToastReturn,
  UseNavigationReturn,
  PermitState,
  OpenAIResponse,
  PermitSubmissionResponse,
  TranslationMock,
  MockLocation,
  MockParams,
  MockLocalStorage,
  TestUser,
  TestError,
  ValidationResult,
  TestIDs,
  ValidationPatterns,
  Routes,
  MockComponentProps,
} from './types';

// Navigation Mock
export const mockNavigate = vi.fn();

// Permit Steps Mock Data
export const mockStepsData: StepData[] = [
  {
    number: 1,
    title: 'Personal Information',
    isActive: true,
    isCompleted: false,
  },
  {
    number: 2,
    title: 'Family Financial',
    isActive: false,
    isCompleted: false,
  },
  {
    number: 3,
    title: 'Situation Description',
    isActive: false,
    isCompleted: false,
  },
];

// Hook Mocks
export const mockUsePermitSteps = vi.fn(
  (): UsePermitStepsReturn => ({
    steps: mockStepsData,
    currentStep: mockStepsData[0],
    nextStep: mockStepsData[1],
    previousStep: null,
    isFirstStep: true,
    isLastStep: false,
    goToStep: vi.fn(),
    goToNextStep: vi.fn(),
    goToPreviousStep: vi.fn(),
  })
);

export const mockUseRefreshWarning = vi.fn();

export const mockUseToast = vi.fn(
  (): UseToastReturn => ({
    showToast: vi.fn(),
    hideToast: vi.fn(),
    toasts: [],
  })
);

export const mockUseNavigation = vi.fn(
  (): UseNavigationReturn => ({
    navigate: mockNavigate,
    goBack: vi.fn(),
    goForward: vi.fn(),
    canGoBack: false,
    canGoForward: false,
  })
);

// Redux Store Mocks
export const mockDispatch = vi.fn();
export const mockSelector = vi.fn();

export const mockPermitState: PermitState = {
  personalInformation: null,
  familyFinancial: null,
  situationDescription: null,
  isLoading: false,
  error: null,
  submissionId: null,
};

// Form Validation Mocks
export const mockFormErrors: Record<keyof PersonalInformationData, string> = {
  name: '',
  nationalId: '',
  dateOfBirth: '',
  gender: '',
  address: '',
  country: '',
  city: '',
  state: '',
  phone: '',
  email: '',
};

// API Mocks
export const mockOpenAIResponse: OpenAIResponse = {
  choices: [
    {
      message: {
        content: 'Mocked AI response for testing',
      },
    },
  ],
};

export const mockPermitSubmissionResponse: PermitSubmissionResponse = {
  success: true,
  submissionId: 'test-submission-123',
  message: 'Application submitted successfully',
};

// Translation Mocks
export const mockTranslation: TranslationMock = {
  t: vi.fn((key: string) => key),
  i18n: {
    language: 'en',
    changeLanguage: vi.fn(),
  },
};

// Router Mocks
export const mockLocation: MockLocation = {
  pathname: '/permit/personal-information',
  search: '',
  hash: '',
  state: null,
  key: 'test-key',
};

export const mockParams: MockParams = {
  step: 'personal-information',
};

// Local Storage Mocks
export const mockLocalStorage: MockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};

// Form Component Mocks
export const mockFormInput = vi.fn<[MockComponentProps], unknown>(
  ({ children }) => children
);
export const mockFormSelect = vi.fn<[MockComponentProps], unknown>(
  ({ children }) => children
);
export const mockFormTextArea = vi.fn<[MockComponentProps], unknown>(
  ({ children }) => children
);

// Test Constants
export const TEST_IDS: TestIDs = {
  page: 'personal-information-page',
  form: 'personal-information-form',
  sections: {
    personal: 'personal-information-section',
    address: 'address-information-section',
    contact: 'contact-information-section',
  },
  fields: {
    name: 'name-input',
    nationalId: 'national-id-input',
    dateOfBirth: 'date-of-birth-input',
    gender: 'gender-select',
    address: 'address-input',
    country: 'country-select',
    city: 'city-input',
    state: 'state-input',
    phone: 'phone-input',
    email: 'email-input',
  },
  navigation: {
    container: 'navigation',
    next: 'next-button',
    previous: 'previous-button',
    submit: 'submit-button',
  },
};

export const REQUIRED_FIELDS: (keyof PersonalInformationData)[] = [
  'name',
  'nationalId',
  'dateOfBirth',
  'gender',
  'address',
  'country',
  'city',
  'state',
  'phone',
  'email',
];

export const VALIDATION_PATTERNS: ValidationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-()]{10,}$/,
  nationalId: /^\d{10}$/,
  name: /^[a-zA-Z\s]+$/,
};

export const LANGUAGES: readonly string[] = ['en', 'ar'] as const;

export const ROUTES: Routes = {
  personalInformation: '/permit/personal-information',
  familyFinancial: '/permit/family-financial',
  situationDescription: '/permit/situation-description',
};

// Test Data Generators
export const createMockFormData = (
  overrides: Partial<PersonalInformationData> = {}
): PersonalInformationData => ({
  name: 'John Doe',
  nationalId: '1234567890',
  dateOfBirth: '1990-01-01',
  gender: 'male',
  address: '123 Main St',
  country: 'US',
  city: 'New York',
  state: 'NY',
  phone: '+1234567890',
  email: 'john@example.com',
  ...overrides,
});

export const createEmptyFormData = (): PersonalInformationData => ({
  name: '',
  nationalId: '',
  dateOfBirth: '',
  gender: '',
  address: '',
  country: '',
  city: '',
  state: '',
  phone: '',
  email: '',
});

export const createPartialFormData = (): PersonalInformationData => ({
  name: 'John Doe',
  nationalId: '1234567890',
  dateOfBirth: '',
  gender: '',
  address: '',
  country: '',
  city: '',
  state: '',
  phone: '',
  email: 'john@example.com',
});

export const createIncompleteFormData = (): PersonalInformationData => ({
  name: 'John Doe',
  nationalId: '',
  dateOfBirth: '1990-01-01',
  gender: 'male',
  address: '123 Main St',
  country: 'US',
  city: 'New York',
  state: 'NY',
  phone: '+1234567890',
  email: 'john@example.com',
});

export const createMockUser = (
  overrides: Partial<TestUser> = {}
): TestUser => ({
  id: 'user-123',
  name: 'Test User',
  email: 'test@example.com',
  role: 'applicant',
  ...overrides,
});

export const createMockError = (
  message = 'Test error',
  code = 'TEST_ERROR'
): TestError => ({
  message,
  code,
  timestamp: new Date().toISOString(),
});

// Validation Functions
export const isFormComplete = (data: Record<string, string>) => {
  return REQUIRED_FIELDS.every(
    field => data[field] && data[field].trim() !== ''
  );
};

export const calculateProgress = (data: Record<string, string>) => {
  const filledFields = REQUIRED_FIELDS.filter(
    field => data[field] && data[field].trim() !== ''
  );
  return Math.round((filledFields.length / REQUIRED_FIELDS.length) * 100);
};

export const isRTL = (lang: string) => lang === 'ar';

export const getTextDirection = (language: string) =>
  language === 'ar' ? 'rtl' : 'ltr';

// Mock Functions for Common Operations
export const mockValidateForm = vi.fn(
  (data: Record<string, string>): ValidationResult => {
    const errors: Record<string, string> = {};
    if (!data.name) errors.name = 'Name is required';
    if (!data.email) errors.email = 'Email is required';
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
);

export const mockSubmitForm = vi.fn(
  async (): Promise<PermitSubmissionResponse> => {
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async
    return mockPermitSubmissionResponse;
  }
);

export const mockGenerateText = vi.fn(async () => {
  await new Promise(resolve => setTimeout(resolve, 50)); // Simulate async
  return 'Generated text response';
});

// Reset all mocks function
export const resetAllMocks = () => {
  vi.clearAllMocks();
  mockNavigate.mockReset();
  mockUsePermitSteps.mockReset();
  mockUseRefreshWarning.mockReset();
  mockUseToast.mockReset();
  mockUseNavigation.mockReset();
  mockDispatch.mockReset();
  mockSelector.mockReset();
  mockValidateForm.mockReset();
  mockSubmitForm.mockReset();
  mockGenerateText.mockReset();
};
