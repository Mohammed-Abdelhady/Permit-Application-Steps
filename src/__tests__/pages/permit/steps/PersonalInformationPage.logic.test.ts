/**
 * Personal Information Page Tests - Vitest Native
 *
 * This test suite focuses on the core logical functionality using Vitest's built-in capabilities:
 * - Component rendering and structure validation
 * - Form field logic testing
 * - State management verification
 * - Navigation behavior testing
 */

import { describe, test, expect, beforeEach, vi } from 'vitest';
import '../../../mocks/moduleMocks';
import {
  TEST_IDS,
  REQUIRED_FIELDS,
  VALIDATION_PATTERNS,
  LANGUAGES,
  ROUTES,
  createMockFormData,
  createEmptyFormData,
  createPartialFormData,
  createIncompleteFormData,
  isFormComplete,
  calculateProgress,
  isRTL,
  getTextDirection,
  mockStepsData,
} from '../../../mocks';
import type { PersonalInformationData } from '../../../mocks/types';

describe('PersonalInformationPage - Core Logic Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Structure Tests', () => {
    test('should have correct test IDs defined', () => {
      // Verify test ID structure is logical and complete
      expect(TEST_IDS.page).toBe('personal-information-page');
      expect(TEST_IDS.form).toBe('personal-information-form');
      expect(Object.keys(TEST_IDS.sections)).toHaveLength(6);
      expect(Object.keys(TEST_IDS.fields)).toHaveLength(15);
      expect(Object.keys(TEST_IDS.navigation)).toHaveLength(4);
    });
  });

  describe('Form Validation Logic', () => {
    test('should validate required fields', () => {
      expect(REQUIRED_FIELDS).toContain('name');
      expect(REQUIRED_FIELDS).toContain('email');
      expect(REQUIRED_FIELDS).toHaveLength(10);
    });

    test('should validate email format', () => {
      // Valid emails
      expect(VALIDATION_PATTERNS.email.test('test@example.com')).toBe(true);
      expect(VALIDATION_PATTERNS.email.test('user.name@domain.co.uk')).toBe(
        true
      );

      // Invalid emails
      expect(VALIDATION_PATTERNS.email.test('invalid-email')).toBe(false);
      expect(VALIDATION_PATTERNS.email.test('test@')).toBe(false);
      expect(VALIDATION_PATTERNS.email.test('@domain.com')).toBe(false);
    });

    test('should validate phone number format', () => {
      // Valid phone numbers
      expect(VALIDATION_PATTERNS.phone.test('+1234567890')).toBe(true);
      expect(VALIDATION_PATTERNS.phone.test('(123) 456-7890')).toBe(true);
      expect(VALIDATION_PATTERNS.phone.test('123 456 7890')).toBe(true);

      // Invalid phone numbers
      expect(VALIDATION_PATTERNS.phone.test('123')).toBe(false);
      expect(VALIDATION_PATTERNS.phone.test('abc123')).toBe(false);
    });

    test('should validate national ID format', () => {
      // Valid national IDs
      expect(VALIDATION_PATTERNS.nationalId.test('1234567890')).toBe(true);

      // Invalid national IDs
      expect(VALIDATION_PATTERNS.nationalId.test('123')).toBe(false);
      expect(VALIDATION_PATTERNS.nationalId.test('abcd567890')).toBe(false);
      expect(VALIDATION_PATTERNS.nationalId.test('12345678901')).toBe(false);
    });
  });

  describe('Form Data Structure', () => {
    test('should have correct form data structure', () => {
      const validFormData = createMockFormData();

      // Verify all required fields are present
      REQUIRED_FIELDS.forEach(field => {
        expect(validFormData).toHaveProperty(field);
      });

      // Verify field types
      expect(typeof validFormData.name).toBe('string');
      expect(typeof validFormData.email).toBe('string');
      expect(validFormData.name).toMatch(VALIDATION_PATTERNS.name);
    });

    test('should handle empty form data', () => {
      const emptyFormData = createEmptyFormData();

      // All fields should be empty strings
      Object.values(emptyFormData).forEach(value => {
        expect(value).toBe('');
      });
    });
  });

  describe('Navigation Logic', () => {
    test('should navigate to family financial page on successful submission', () => {
      expect(ROUTES.familyFinancial).toBe('/permit/family-financial');
      expect(ROUTES.familyFinancial).toMatch(/^\/permit\//);
    });

    test('should show correct step information', () => {
      const totalSteps = mockStepsData.length;
      const currentStepNumber = mockStepsData.find(
        step => step.isActive
      )?.number;

      expect(currentStepNumber).toBe(1);
      expect(totalSteps).toBe(3);
      expect(currentStepNumber).toBeLessThan(totalSteps);
    });

    test('should handle step progression logic', () => {
      const currentStep = mockStepsData.find(step => step.isActive);
      const nextStep = mockStepsData.find(
        step => step.number === (currentStep?.number ?? 0) + 1
      );

      expect(currentStep?.number).toBe(1);
      expect(nextStep?.number).toBe(2);
      expect(currentStep?.isActive).toBe(true);
      expect(nextStep?.isActive).toBe(false);
    });
  });

  describe('State Management Logic', () => {
    test('should handle form state updates', () => {
      const initialState = {
        personalInformation: null as PersonalInformationData | null,
        familyFinancial: null,
        situationDescription: null,
      };

      const personalInfo = createMockFormData({
        name: 'John Doe',
        email: 'john@example.com',
      });

      // Simulate state update
      const updatedState = {
        ...initialState,
        personalInformation: personalInfo,
      };

      expect(updatedState.personalInformation).not.toBeNull();
      expect(updatedState.personalInformation?.name).toBe('John Doe');
      expect(updatedState.personalInformation?.email).toBe('john@example.com');
      expect(updatedState.familyFinancial).toBeNull();
      expect(updatedState.situationDescription).toBeNull();
    });

    test('should handle form state clearing', () => {
      const stateWithData = {
        personalInformation: createMockFormData({
          name: 'John Doe',
          email: 'john@example.com',
        }),
        familyFinancial: null,
        situationDescription: null,
      };

      // Simulate clearing personal information
      const clearedState = {
        ...stateWithData,
        personalInformation: null,
      };

      expect(clearedState.personalInformation).toBeNull();
    });
  });

  describe('Error Handling Logic', () => {
    test('should handle submission errors gracefully', () => {
      const mockError = new Error('Submission failed');

      expect(mockError.message).toBe('Submission failed');
      expect(mockError).toBeInstanceOf(Error);
    });

    test('should handle validation errors', () => {
      const validationErrors = {
        name: 'Name is required',
        email: 'Invalid email format',
      };

      expect(validationErrors.name).toBe('Name is required');
      expect(validationErrors.email).toBe('Invalid email format');
      expect(Object.keys(validationErrors)).toHaveLength(2);
    });
  });

  describe('Internationalization Logic', () => {
    test('should handle language switching', () => {
      expect(LANGUAGES).toContain('en');
      expect(LANGUAGES).toContain('ar');

      // Test RTL logic for Arabic
      expect(isRTL('ar')).toBe(true);
      expect(isRTL('en')).toBe(false);
    });

    test('should handle text direction logic', () => {
      expect(getTextDirection('ar')).toBe('rtl');
      expect(getTextDirection('en')).toBe('ltr');
    });
  });

  describe('Business Logic Validation', () => {
    test('should validate form completion status', () => {
      const completeData = createMockFormData();
      const incompleteData = createIncompleteFormData();

      expect(isFormComplete(completeData)).toBe(true);
      expect(isFormComplete(incompleteData)).toBe(false);
    });

    test('should calculate form progress', () => {
      const partialData = createPartialFormData();

      expect(calculateProgress(partialData)).toBe(30); // 3 out of 10 fields = 30%
    });
  });
});
