export interface PersonalInformation {
  name: string;
  nationalId: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  address: string;
  country: string;
  city: string;
  state: string;
  email: string;
  phoneNumber: string;
}

export interface FamilyFinancial {
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  dependents: string;
  employmentStatus: 'employed' | 'unemployed' | 'self-employed' | 'student';
  monthlyIncome: string;
  housingStatus: 'owned' | 'rented' | 'family' | 'other';
}

export interface SituationDescription {
  currentFinancialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
}

export interface TestData {
  personalInformation: PersonalInformation;
  familyFinancial: FamilyFinancial;
  situationDescription: SituationDescription;
}

// Complete test data for all scenarios
export const completeTestData: TestData = {
  personalInformation: {
    name: 'Mohammed Abdelhady',
    nationalId: '1234567890',
    dateOfBirth: '03/15/1985',
    gender: 'male',
    address: '123 Main Street',
    country: 'sa',
    city: 'Riyadh',
    state: 'Riyadh Province',
    email: 'mohammed.abdelhady@example.com',
    phoneNumber: '+966501234567',
  },
  familyFinancial: {
    maritalStatus: 'married',
    dependents: '4',
    employmentStatus: 'employed',
    monthlyIncome: '15000',
    housingStatus: 'owned',
  },
  situationDescription: {
    currentFinancialSituation:
      'I am applying for a residence permit to continue my career as a software engineer and contribute to the local technology sector.',
    employmentCircumstances:
      'I am currently employed as a senior software engineer with 8 years of experience in web development and AI technologies.',
    reasonForApplying:
      'I plan to establish my own technology consulting firm and mentor local developers while contributing to the digital transformation initiatives.',
  },
};

// Test data for validation scenarios (with intentional errors)
export const validationTestData: TestData = {
  personalInformation: {
    name: 'Mohammed Abdelhady',
    nationalId: '9876543210',
    dateOfBirth: '12/25/1990',
    gender: 'male',
    address: '456 King Fahd Road',
    country: 'sa',
    city: 'Jeddah',
    state: 'Makkah Province',
    email: 'ahmed.alrashid@example.com',
    phoneNumber: '+966502345678',
  },
  familyFinancial: {
    maritalStatus: 'single',
    dependents: '0',
    employmentStatus: 'self-employed',
    monthlyIncome: '8000',
    housingStatus: 'rented',
  },
  situationDescription: {
    currentFinancialSituation:
      'I am seeking a residence permit to expand my business operations and contribute to the local economy.',
    employmentCircumstances:
      'I run a small consulting business specializing in digital marketing and e-commerce solutions.',
    reasonForApplying:
      'I want to establish a permanent presence in the region and hire local talent for my growing business.',
  },
};

// Test data for AI generation scenarios
export const aiGenerationTestData: TestData = {
  personalInformation: {
    name: 'Sarah Johnson',
    nationalId: '1122334455',
    dateOfBirth: '07/10/1988',
    gender: 'female',
    address: '789 Business District',
    country: 'us',
    city: 'New York',
    state: 'New York',
    email: 'sarah.johnson@example.com',
    phoneNumber: '+1234567890',
  },
  familyFinancial: {
    maritalStatus: 'married',
    dependents: '2',
    employmentStatus: 'employed',
    monthlyIncome: '12000',
    housingStatus: 'owned',
  },
  situationDescription: {
    currentFinancialSituation:
      'I am applying for a residence permit to work as a senior data scientist.',
    employmentCircumstances:
      'I have been offered a position at a leading technology company.',
    reasonForApplying:
      'I want to contribute to the local AI and machine learning ecosystem.',
  },
};

// Invalid test data for error scenarios
export const invalidTestData: TestData = {
  personalInformation: {
    name: '', // Empty name
    nationalId: '123', // Too short
    dateOfBirth: '13/45/2000', // Invalid date
    gender: 'male' as const,
    address: '', // Empty address
    country: 'sa',
    city: '', // Empty city
    state: '', // Empty state
    email: 'invalid-email', // Invalid email
    phoneNumber: '123', // Too short
  },
  familyFinancial: {
    maritalStatus: 'married',
    dependents: '-1', // Negative number
    employmentStatus: 'employed',
    monthlyIncome: 'abc', // Non-numeric
    housingStatus: 'owned',
  },
  situationDescription: {
    currentFinancialSituation: '', // Empty
    employmentCircumstances: '', // Empty
    reasonForApplying: '', // Empty
  },
};

// Expected validation messages
export const validationMessages = {
  required: 'Full name is required',
  invalidEmail: 'Please enter a valid email address',
  invalidPhone: 'Phone number must be at least 10 digits',
  invalidDate: 'Please enter a valid date',
  invalidNumber: 'Please enter a valid number',
  minLength: 'This field must be at least',
  maxLength: 'This field must not exceed',
  nationalIdRequired: 'National ID must be at least 10 digits',
  addressRequired: 'Address is required',
  cityRequired: 'City is required',
  stateRequired: 'State/Province is required',
};

// Test IDs for form elements
export const testIds = {
  // Personal Information
  nameInput: 'name-input',
  nationalIdInput: 'national-id-input',
  dateOfBirthInput: 'date-of-birth-input',
  genderSelect: 'gender-select',
  addressInput: 'address-input',
  countrySelect: 'country-select',
  cityInput: 'city-input',
  stateInput: 'state-input',
  emailInput: 'email-input',
  phoneInput: 'phone-input',

  // Family Financial
  maritalStatusSelect: 'marital-status-select',
  dependentsInput: 'dependents-input',
  employmentStatusSelect: 'employment-status-select',
  monthlyIncomeInput: 'monthly-income-input',
  housingStatusSelect: 'housing-status-select',

  // Situation Description
  currentFinancialSituationInput: 'current-financial-situation-input',
  employmentCircumstancesInput: 'employment-circumstances-input',
  reasonForApplyingInput: 'reason-for-applying-input',

  // Navigation
  nextButton: 'next-button',
  previousButton: 'previous-button',
  submitButton: 'submit-button',

  // Pages
  personalInformationPage: 'personal-information-page',
  familyFinancialPage: 'family-financial-page',
  situationDescriptionPage: 'situation-description-page',

  // Success Page
  successHeader: 'success-header',
  applicationId: 'application-id',
  submissionDate: 'submission-date',
  applicationSummary: 'application-summary',
  applicationAnalysis: 'application-analysis',

  // AI/Suggestion Components
  textSuggestionPopup: 'text-suggestion-popup',
  suggestionDisplay: 'suggestion-display',
  acceptButton: 'accept-button',
  rejectButton: 'reject-button',
  generateButton: 'generate-button',

  // Progress
  step1Circle: 'step-1-circle',
  step2Circle: 'step-2-circle',
  step3Circle: 'step-3-circle',
};

// Select option test IDs
export const selectOptions = {
  gender: {
    male: 'form-select-option-male',
    female: 'form-select-option-female',
  },
  maritalStatus: {
    single: 'form-select-option-single',
    married: 'form-select-option-married',
    divorced: 'form-select-option-divorced',
    widowed: 'form-select-option-widowed',
  },
  employmentStatus: {
    employed: 'form-select-option-employed',
    unemployed: 'form-select-option-unemployed',
    selfEmployed: 'form-select-option-self-employed',
    student: 'form-select-option-student',
  },
  housingStatus: {
    owned: 'form-select-option-owned',
    rented: 'form-select-option-rented',
    family: 'form-select-option-family',
    other: 'form-select-option-other',
  },
  country: {
    sa: 'form-select-option-sa',
    us: 'form-select-option-us',
    ae: 'form-select-option-ae',
    eg: 'form-select-option-eg',
  },
};

// Button names for dropdowns
export const buttonNames = {
  selectGender: 'Select your gender',
  selectMaritalStatus: 'Select your marital status',
  selectEmploymentStatus: 'Select your employment status',
  selectHousingStatus: 'Select your housing status',
  selectCountry: 'Enter your country',
};
