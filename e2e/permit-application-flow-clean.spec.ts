import { test, expect } from '@playwright/test';

/**
 * Comprehensive E2E tests for the complete permit application flow
 * Covers: Personal Information → Family Financial → Situation Description → Success Page
 * Includes: Form validation, API calls, GPT generation, and complete user journey
 */

test.describe('Complete Permit Application Flow', () => {
  // Test data
  const personalData = {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-01-15',
    nationality: 'US',
    passportNumber: 'A12345678',
    email: 'john.doe@example.com',
    phoneNumber: '+1234567890',
  };

  const familyFinancialData = {
    monthlyIncome: '5000',
    familySize: '3',
    spouseIncome: '3000',
    numberOfChildren: '2',
    monthlyExpenses: '2500',
    savingsAmount: '15000',
  };

  const situationData = {
    reasonForApplication:
      'I am applying for a residence permit to continue my career.',
    currentSituation: 'I am employed as a software engineer.',
    futureGoals: 'I plan to continue my career in technology.',
    emergencyContactName: 'Jane Doe',
    emergencyContactRelationship: 'spouse',
    emergencyContactPhone: '+1234567891',
    emergencyContactEmail: 'jane.doe@example.com',
  };

  test('should complete the entire permit application flow successfully', async ({
    page,
  }) => {
    // Step 1: Personal Information
    await test.step('Fill Personal Information', async () => {
      await page.goto('/permit/personal');
      await page.waitForLoadState('networkidle');

      await expect(page.getByTestId('personal-information-page')).toBeVisible();
      await expect(page.getByTestId('progress-step-1')).toHaveClass(/active/);

      // Fill personal information fields
      await page.getByTestId('first-name-field').fill(personalData.firstName);
      await page.getByTestId('last-name-field').fill(personalData.lastName);
      await page
        .getByTestId('date-of-birth-field')
        .fill(personalData.dateOfBirth);
      await page
        .getByTestId('nationality-field')
        .selectOption(personalData.nationality);
      await page
        .getByTestId('passport-number-field')
        .fill(personalData.passportNumber);
      await page.getByTestId('email-field').fill(personalData.email);
      await page
        .getByTestId('phone-number-field')
        .fill(personalData.phoneNumber);

      // Navigate to next step
      await page.getByTestId('navigation-next').click();
    });

    // Step 2: Family Financial Information
    await test.step('Fill Family Financial Information', async () => {
      await page.waitForURL('/permit/family-financial');
      await page.waitForLoadState('networkidle');

      await expect(page.getByTestId('family-financial-page')).toBeVisible();
      await expect(page.getByTestId('progress-step-2')).toHaveClass(/active/);

      // Fill financial information
      await page
        .getByTestId('monthly-income-field')
        .fill(familyFinancialData.monthlyIncome);
      await page
        .getByTestId('family-size-field')
        .fill(familyFinancialData.familySize);

      // Handle spouse information
      await page.getByTestId('has-spouse-checkbox').check();
      await page
        .getByTestId('spouse-income-field')
        .fill(familyFinancialData.spouseIncome);

      // Handle children information
      await page.getByTestId('has-children-checkbox').check();
      await page
        .getByTestId('number-of-children-field')
        .fill(familyFinancialData.numberOfChildren);

      await page
        .getByTestId('monthly-expenses-field')
        .fill(familyFinancialData.monthlyExpenses);
      await page
        .getByTestId('savings-amount-field')
        .fill(familyFinancialData.savingsAmount);

      // Navigate to next step
      await page.getByTestId('navigation-next').click();
    });

    // Step 3: Situation Description
    await test.step('Fill Situation Description and Submit', async () => {
      await page.waitForURL('/permit/situation');
      await page.waitForLoadState('networkidle');

      await expect(
        page.getByTestId('situation-description-page')
      ).toBeVisible();
      await expect(page.getByTestId('progress-step-3')).toHaveClass(/active/);

      // Fill situation description fields
      await page
        .getByTestId('reason-for-application-field')
        .fill(situationData.reasonForApplication);
      await page
        .getByTestId('current-situation-field')
        .fill(situationData.currentSituation);
      await page
        .getByTestId('future-goals-field')
        .fill(situationData.futureGoals);

      // Fill emergency contact information
      await page
        .getByTestId('emergency-contact-name-field')
        .fill(situationData.emergencyContactName);
      await page
        .getByTestId('emergency-contact-relationship-field')
        .selectOption(situationData.emergencyContactRelationship);
      await page
        .getByTestId('emergency-contact-phone-field')
        .fill(situationData.emergencyContactPhone);
      await page
        .getByTestId('emergency-contact-email-field')
        .fill(situationData.emergencyContactEmail);

      // Submit application
      await page.getByTestId('navigation-submit').click();
    });

    // Step 4: Verify Success Page
    await test.step('Verify Application Success', async () => {
      await page.waitForURL(/\/permit\/success\/.+/);
      await page.waitForLoadState('networkidle');

      // Verify success page elements
      await expect(page.getByTestId('success-header')).toBeVisible();
      await expect(page.getByTestId('application-summary')).toBeVisible();
      await expect(page.getByTestId('application-analysis')).toBeVisible();

      // Verify application ID is displayed
      const applicationId = await page
        .getByTestId('application-id')
        .textContent();
      expect(applicationId).toMatch(/^APP-\d{4}-\d{6}$/);
    });
  });

  test('should validate required fields on each form', async ({ page }) => {
    // Test Personal Information validation
    await test.step('Test Personal Information Validation', async () => {
      await page.goto('/permit/personal');
      await page.waitForLoadState('networkidle');

      // Try to proceed without filling required fields
      await page.getByTestId('navigation-next').click();

      // Check that validation errors are shown
      const requiredFields = [
        'first-name-field',
        'last-name-field',
        'date-of-birth-field',
        'nationality-field',
        'passport-number-field',
        'email-field',
        'phone-number-field',
      ];

      for (const fieldTestId of requiredFields) {
        await expect(page.getByTestId(`${fieldTestId}-error`)).toBeVisible();
      }
    });

    // Test Family Financial validation
    await test.step('Test Family Financial Validation', async () => {
      // Fill personal info first to navigate to family financial
      await page.getByTestId('first-name-field').fill(personalData.firstName);
      await page.getByTestId('last-name-field').fill(personalData.lastName);
      await page
        .getByTestId('date-of-birth-field')
        .fill(personalData.dateOfBirth);
      await page
        .getByTestId('nationality-field')
        .selectOption(personalData.nationality);
      await page
        .getByTestId('passport-number-field')
        .fill(personalData.passportNumber);
      await page.getByTestId('email-field').fill(personalData.email);
      await page
        .getByTestId('phone-number-field')
        .fill(personalData.phoneNumber);

      await page.getByTestId('navigation-next').click();
      await page.waitForURL('/permit/family-financial');

      // Try to proceed without filling required fields
      await page.getByTestId('navigation-next').click();

      const requiredFields = [
        'monthly-income-field',
        'family-size-field',
        'monthly-expenses-field',
        'savings-amount-field',
      ];

      for (const fieldTestId of requiredFields) {
        await expect(page.getByTestId(`${fieldTestId}-error`)).toBeVisible();
      }
    });
  });

  test('should test AI help functionality for text generation', async ({
    page,
  }) => {
    // Navigate through forms to situation description
    await page.goto('/permit/personal');
    await page.waitForLoadState('networkidle');

    // Fill personal info
    await page.getByTestId('first-name-field').fill(personalData.firstName);
    await page.getByTestId('last-name-field').fill(personalData.lastName);
    await page
      .getByTestId('date-of-birth-field')
      .fill(personalData.dateOfBirth);
    await page
      .getByTestId('nationality-field')
      .selectOption(personalData.nationality);
    await page
      .getByTestId('passport-number-field')
      .fill(personalData.passportNumber);
    await page.getByTestId('email-field').fill(personalData.email);
    await page.getByTestId('phone-number-field').fill(personalData.phoneNumber);

    await page.getByTestId('navigation-next').click();

    // Fill family financial info
    await page.waitForURL('/permit/family-financial');
    await page
      .getByTestId('monthly-income-field')
      .fill(familyFinancialData.monthlyIncome);
    await page
      .getByTestId('family-size-field')
      .fill(familyFinancialData.familySize);
    await page
      .getByTestId('monthly-expenses-field')
      .fill(familyFinancialData.monthlyExpenses);
    await page
      .getByTestId('savings-amount-field')
      .fill(familyFinancialData.savingsAmount);

    await page.getByTestId('navigation-next').click();

    // Test AI help for situation description fields
    await page.waitForURL('/permit/situation');

    await test.step('Test AI Help for Reason for Application', async () => {
      const aiHelpButton = page.getByTestId(
        'reason-for-application-field-ai-help'
      );
      if (await aiHelpButton.isVisible()) {
        await aiHelpButton.click();

        // Wait for AI suggestion popup
        await expect(page.getByTestId('text-suggestion-popup')).toBeVisible();

        // Wait for GPT response (max 10 seconds)
        await page.waitForSelector('[data-testid="suggestion-content"]', {
          timeout: 10000,
        });

        // Verify suggestion content is generated
        const suggestionContent = await page
          .getByTestId('suggestion-content')
          .textContent();
        expect(suggestionContent).toBeTruthy();
        expect(suggestionContent!.length).toBeGreaterThan(10);

        // Accept the suggestion
        await page.getByTestId('accept-suggestion-button').click();

        // Verify the field is filled with the suggestion
        const fieldValue = await page
          .getByTestId('reason-for-application-field')
          .inputValue();
        expect(fieldValue).toBeTruthy();
      }
    });
  });

  test('should handle navigation between steps correctly', async ({ page }) => {
    await test.step('Forward Navigation', async () => {
      // Start from personal information
      await page.goto('/permit/personal');
      await page.waitForLoadState('networkidle');

      // Fill and navigate to family financial
      await page.getByTestId('first-name-field').fill(personalData.firstName);
      await page.getByTestId('last-name-field').fill(personalData.lastName);
      await page
        .getByTestId('date-of-birth-field')
        .fill(personalData.dateOfBirth);
      await page
        .getByTestId('nationality-field')
        .selectOption(personalData.nationality);
      await page
        .getByTestId('passport-number-field')
        .fill(personalData.passportNumber);
      await page.getByTestId('email-field').fill(personalData.email);
      await page
        .getByTestId('phone-number-field')
        .fill(personalData.phoneNumber);

      await page.getByTestId('navigation-next').click();

      // Navigate to situation description
      await page.waitForURL('/permit/family-financial');
      await page
        .getByTestId('monthly-income-field')
        .fill(familyFinancialData.monthlyIncome);
      await page
        .getByTestId('family-size-field')
        .fill(familyFinancialData.familySize);
      await page
        .getByTestId('monthly-expenses-field')
        .fill(familyFinancialData.monthlyExpenses);
      await page
        .getByTestId('savings-amount-field')
        .fill(familyFinancialData.savingsAmount);

      await page.getByTestId('navigation-next').click();

      await page.waitForURL('/permit/situation');
      await expect(
        page.getByTestId('situation-description-page')
      ).toBeVisible();
    });

    await test.step('Backward Navigation', async () => {
      // Navigate back to family financial
      await page.getByTestId('navigation-previous').click();
      await page.waitForURL('/permit/family-financial');
      await expect(page.getByTestId('family-financial-page')).toBeVisible();

      // Navigate back to personal information
      await page.getByTestId('navigation-previous').click();
      await page.waitForURL('/permit/personal');
      await expect(page.getByTestId('personal-information-page')).toBeVisible();
    });
  });

  test('should persist form data when navigating between steps', async ({
    page,
  }) => {
    // Fill personal information
    await page.goto('/permit/personal');
    await page.waitForLoadState('networkidle');

    await page.getByTestId('first-name-field').fill(personalData.firstName);
    await page.getByTestId('last-name-field').fill(personalData.lastName);
    await page
      .getByTestId('date-of-birth-field')
      .fill(personalData.dateOfBirth);
    await page
      .getByTestId('nationality-field')
      .selectOption(personalData.nationality);
    await page
      .getByTestId('passport-number-field')
      .fill(personalData.passportNumber);
    await page.getByTestId('email-field').fill(personalData.email);
    await page.getByTestId('phone-number-field').fill(personalData.phoneNumber);

    await page.getByTestId('navigation-next').click();

    // Fill family financial and navigate forward
    await page.waitForURL('/permit/family-financial');
    await page
      .getByTestId('monthly-income-field')
      .fill(familyFinancialData.monthlyIncome);
    await page
      .getByTestId('family-size-field')
      .fill(familyFinancialData.familySize);

    await page.getByTestId('navigation-next').click();

    // Navigate back to verify data persistence
    await page.waitForURL('/permit/situation');
    await page.getByTestId('navigation-previous').click();

    // Verify family financial data is preserved
    await page.waitForURL('/permit/family-financial');
    await expect(page.getByTestId('monthly-income-field')).toHaveValue(
      familyFinancialData.monthlyIncome
    );
    await expect(page.getByTestId('family-size-field')).toHaveValue(
      familyFinancialData.familySize
    );

    // Navigate back to personal and verify data
    await page.getByTestId('navigation-previous').click();
    await page.waitForURL('/permit/personal');
    await expect(page.getByTestId('first-name-field')).toHaveValue(
      personalData.firstName
    );
    await expect(page.getByTestId('last-name-field')).toHaveValue(
      personalData.lastName
    );
  });

  test('should handle API responses and loading states', async ({ page }) => {
    // Complete the flow to test API calls
    await page.goto('/permit/personal');
    await page.waitForLoadState('networkidle');

    // Fill all forms
    await page.getByTestId('first-name-field').fill(personalData.firstName);
    await page.getByTestId('last-name-field').fill(personalData.lastName);
    await page
      .getByTestId('date-of-birth-field')
      .fill(personalData.dateOfBirth);
    await page
      .getByTestId('nationality-field')
      .selectOption(personalData.nationality);
    await page
      .getByTestId('passport-number-field')
      .fill(personalData.passportNumber);
    await page.getByTestId('email-field').fill(personalData.email);
    await page.getByTestId('phone-number-field').fill(personalData.phoneNumber);

    await page.getByTestId('navigation-next').click();

    await page.waitForURL('/permit/family-financial');
    await page
      .getByTestId('monthly-income-field')
      .fill(familyFinancialData.monthlyIncome);
    await page
      .getByTestId('family-size-field')
      .fill(familyFinancialData.familySize);
    await page
      .getByTestId('monthly-expenses-field')
      .fill(familyFinancialData.monthlyExpenses);
    await page
      .getByTestId('savings-amount-field')
      .fill(familyFinancialData.savingsAmount);

    await page.getByTestId('navigation-next').click();

    await page.waitForURL('/permit/situation');
    await page
      .getByTestId('reason-for-application-field')
      .fill(situationData.reasonForApplication);
    await page
      .getByTestId('current-situation-field')
      .fill(situationData.currentSituation);
    await page
      .getByTestId('future-goals-field')
      .fill(situationData.futureGoals);
    await page
      .getByTestId('emergency-contact-name-field')
      .fill(situationData.emergencyContactName);
    await page
      .getByTestId('emergency-contact-relationship-field')
      .selectOption(situationData.emergencyContactRelationship);
    await page
      .getByTestId('emergency-contact-phone-field')
      .fill(situationData.emergencyContactPhone);
    await page
      .getByTestId('emergency-contact-email-field')
      .fill(situationData.emergencyContactEmail);

    // Monitor network requests during submission
    const responsePromise = page.waitForResponse(
      response =>
        response.url().includes('/api') &&
        response.request().method() === 'POST'
    );

    await page.getByTestId('navigation-submit').click();

    // Verify loading state during submission
    await expect(page.getByTestId('navigation-submit')).toBeDisabled();

    // Wait for API response
    const response = await responsePromise;
    expect(response.status()).toBe(200);

    // Verify success page loads
    await page.waitForURL(/\/permit\/success\/.+/);
    await expect(page.getByTestId('success-header')).toBeVisible();
  });

  test('should support internationalization (i18n)', async ({ page }) => {
    // Test Arabic language support
    await page.goto('/permit/personal?lang=ar');
    await page.waitForLoadState('networkidle');

    // Verify RTL layout
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    // Verify Arabic text is displayed
    const pageTitle = page.getByTestId('page-title');
    if (await pageTitle.isVisible()) {
      const titleText = await pageTitle.textContent();
      expect(titleText).toBeTruthy();
    }

    // Test English language support
    await page.goto('/permit/personal?lang=en');
    await page.waitForLoadState('networkidle');

    // Verify LTR layout
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');

    // Verify English text is displayed
    await expect(page.getByTestId('page-title')).toContainText(
      'Personal Information'
    );
  });

  test('should be responsive across different screen sizes', async ({
    page,
  }) => {
    const viewports = [
      { width: 390, height: 844 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1440, height: 900 }, // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/permit/personal');
      await page.waitForLoadState('networkidle');

      // Verify layout adapts to screen size
      await expect(page.getByTestId('permit-page-layout')).toBeVisible();
      await expect(page.getByTestId('personal-information-form')).toBeVisible();

      // Verify navigation is accessible
      const form = page.getByTestId('personal-information-form');
      await expect(form).toBeInViewport();
    }
  });
});
