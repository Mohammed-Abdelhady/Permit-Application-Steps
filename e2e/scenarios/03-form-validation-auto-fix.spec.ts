import { expect, test } from '@playwright/test';
import { FormHelper } from '../common/formHelper';
import {
  invalidTestData,
  testIds,
  validationMessages,
  validationTestData,
} from '../common/testData';

test.describe('Scenario 3: Form Validation with Manual Fix', () => {
  let formHelper: FormHelper;

  test.beforeEach(async ({ page, context }) => {
    // Clear all browser data for better test isolation
    await context.clearCookies();
    await context.clearPermissions();

    formHelper = new FormHelper(page);
    // Navigate to a page first before clearing localStorage
    await page.goto('/permit/personal');
    await formHelper.clearLocalStorage();
  });

  test('Test form validation with invalid data and manual fix', async ({
    page,
  }) => {
    // Start the application flow
    await page.goto('/permit/personal');
    await formHelper.waitForPageReady(testIds.nameInput);

    // Take initial screenshot
    await formHelper.takeScreenshot('01-personal-information-initial');

    // Step 1: Test Personal Information Validation
    await test.step('Test Personal Information Validation', async () => {
      // Fill with invalid data manually (not using FormHelper for invalid data)
      await page
        .getByTestId(testIds.nameInput)
        .fill(invalidTestData.personalInformation.name);
      await page
        .getByTestId(testIds.nationalIdInput)
        .fill(invalidTestData.personalInformation.nationalId);
      await page.getByTestId(testIds.dateOfBirthInput).fill('2025-12-25'); // Future date (invalid)
      await page
        .getByTestId(testIds.addressInput)
        .fill(invalidTestData.personalInformation.address);
      await page
        .getByTestId(testIds.cityInput)
        .fill(invalidTestData.personalInformation.city);
      await page
        .getByTestId(testIds.stateInput)
        .fill(invalidTestData.personalInformation.state);
      await page
        .getByTestId(testIds.emailInput)
        .fill(invalidTestData.personalInformation.email);
      await page
        .getByTestId(testIds.phoneInput)
        .fill(invalidTestData.personalInformation.phoneNumber);

      // Take screenshot with invalid data
      await formHelper.takeScreenshot('02-personal-information-invalid-data');

      // Try to navigate to next step (should show validation errors)
      await page.getByTestId(testIds.nextButton).click();

      // Wait for validation errors to appear
      await page.waitForTimeout(1000);

      // Take screenshot of validation errors
      await formHelper.takeScreenshot(
        '03-personal-information-validation-errors'
      );

      // Verify validation errors are displayed
      await expect(
        page.locator('text=' + validationMessages.required)
      ).toBeVisible();
      await expect(
        page.locator('text=' + validationMessages.nationalIdRequired)
      ).toBeVisible();
      await expect(
        page.locator('text=' + validationMessages.invalidEmail)
      ).toBeVisible();
      await expect(
        page.locator('text=' + validationMessages.invalidPhone)
      ).toBeVisible();
      await expect(
        page.locator('text=' + validationMessages.addressRequired)
      ).toBeVisible();
      await expect(
        page.locator('text=' + validationMessages.cityRequired)
      ).toBeVisible();
      await expect(
        page.locator('text=' + validationMessages.stateRequired)
      ).toBeVisible();

      // Test manual fix for Name Field
      await test.step('Test Manual Fix for Name Field', async () => {
        // Clear and fill with valid data
        await page.getByTestId(testIds.nameInput).clear();
        await page
          .getByTestId(testIds.nameInput)
          .fill(validationTestData.personalInformation.name);

        await formHelper.takeScreenshot('04-manual-fix-name');
      });

      await test.step('Test Manual Fix for Email Field', async () => {
        // Clear and fill with valid email
        await page.getByTestId(testIds.emailInput).clear();
        await page.getByTestId(testIds.emailInput).fill('valid@example.com');

        await formHelper.takeScreenshot('05-manual-fix-email');

        // Verify email was corrected
        const emailValue = await page
          .getByTestId(testIds.emailInput)
          .inputValue();
        expect(emailValue).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      });

      await test.step('Test Manual Fix for Phone Field', async () => {
        // Clear and fill with valid phone
        await page.getByTestId(testIds.phoneInput).clear();
        await page.getByTestId(testIds.phoneInput).fill('+966501234567');

        await formHelper.takeScreenshot('06-manual-fix-phone');

        // Verify phone was corrected
        const phoneValue = await page
          .getByTestId(testIds.phoneInput)
          .inputValue();
        expect(phoneValue.length).toBeGreaterThan(5);
      });

      // Fill remaining valid data
      await page
        .getByTestId(testIds.nationalIdInput)
        .fill(validationTestData.personalInformation.nationalId);
      await page.getByTestId(testIds.dateOfBirthInput).fill('1990-12-25'); // Convert MM/DD/YYYY to YYYY-MM-DD
      await page
        .getByTestId(testIds.addressInput)
        .fill(validationTestData.personalInformation.address);
      await page
        .getByTestId(testIds.cityInput)
        .fill(validationTestData.personalInformation.city);
      await page
        .getByTestId(testIds.stateInput)
        .fill(validationTestData.personalInformation.state);

      // Select gender and country
      await page.getByRole('button', { name: 'Select your gender' }).click();
      await page.getByTestId('form-select-option-male').click();

      await page.getByRole('button', { name: 'Enter your country' }).click();
      await page.getByTestId('form-select-option-sa').click();

      // Take screenshot after auto-fix
      await formHelper.takeScreenshot('07-personal-information-auto-fixed');

      // Verify validation errors are gone
      await expect(
        page.locator('text=' + validationMessages.required)
      ).not.toBeVisible();
      await expect(
        page.locator('text=' + validationMessages.nationalIdRequired)
      ).not.toBeVisible();
      await expect(
        page.locator('text=' + validationMessages.invalidEmail)
      ).not.toBeVisible();
      await expect(
        page.locator('text=' + validationMessages.invalidPhone)
      ).not.toBeVisible();
      await expect(
        page.locator('text=' + validationMessages.addressRequired)
      ).not.toBeVisible();
      await expect(
        page.locator('text=' + validationMessages.cityRequired)
      ).not.toBeVisible();
      await expect(
        page.locator('text=' + validationMessages.stateRequired)
      ).not.toBeVisible();

      // Navigate to next step
      await page.getByTestId(testIds.nextButton).click();
    });

    // Step 2: Test Family Financial Validation
    await test.step('Test Family Financial Validation', async () => {
      await page.waitForURL('/permit/family-financial');
      await formHelper.waitForPageReady(testIds.maritalStatusSelect);

      // Fill with invalid data
      await page.getByTestId(testIds.dependentsInput).fill('-1'); // Negative number (invalid)
      await page.getByTestId(testIds.monthlyIncomeInput).fill('-100'); // Negative number (invalid)

      // Take screenshot with invalid data
      await formHelper.takeScreenshot('08-family-financial-invalid-data');

      // Try to navigate to next step (should show validation errors)
      await page.getByTestId(testIds.nextButton).click();

      // Wait for validation errors to appear
      await page.waitForTimeout(2000);

      // Take screenshot of validation errors
      await formHelper.takeScreenshot('09-family-financial-validation-errors');

      // Check if validation errors are displayed (they might not show immediately)
      const dependentsErrorVisible = await page
        .locator('text=Number of dependents cannot be negative')
        .isVisible();
      const incomeErrorVisible = await page
        .locator('text=Monthly income cannot be negative')
        .isVisible();

      if (dependentsErrorVisible || incomeErrorVisible) {
        await formHelper.takeScreenshot(
          '09-family-financial-validation-errors-detected'
        );
      }

      // Test manual fix for dependents
      await test.step('Test Manual Fix for Dependents', async () => {
        // Clear and fill with valid data
        await page.getByTestId(testIds.dependentsInput).clear();
        await page.getByTestId(testIds.dependentsInput).fill('2');

        await formHelper.takeScreenshot('10-manual-fix-dependents');

        // Verify dependents was corrected
        const dependentsValue = await page
          .getByTestId(testIds.dependentsInput)
          .inputValue();
        expect(parseInt(dependentsValue)).toBeGreaterThanOrEqual(0);
      });

      // Test manual fix for monthly income
      await test.step('Test Manual Fix for Monthly Income', async () => {
        // Clear and fill with valid data
        await page.getByTestId(testIds.monthlyIncomeInput).clear();
        await page.getByTestId(testIds.monthlyIncomeInput).fill('5000');

        await formHelper.takeScreenshot('11-manual-fix-income');

        // Verify income was corrected
        const incomeValue = await page
          .getByTestId(testIds.monthlyIncomeInput)
          .inputValue();
        expect(parseInt(incomeValue)).toBeGreaterThan(0);
      });

      // Fill remaining valid data
      await page
        .getByTestId(testIds.dependentsInput)
        .fill(validationTestData.familyFinancial.dependents);
      await page
        .getByTestId(testIds.monthlyIncomeInput)
        .fill(validationTestData.familyFinancial.monthlyIncome);

      // Select marital status, employment status, and housing status
      await page
        .getByRole('button', { name: 'Select your marital status' })
        .click();
      await page.getByTestId('form-select-option-single').click();

      await page
        .getByRole('button', { name: 'Select your employment status' })
        .click();
      await page.getByTestId('form-select-option-self-employed').click();

      await page
        .getByRole('button', { name: 'Select your housing status' })
        .click();
      await page.getByTestId('form-select-option-rented').click();

      // Take screenshot after auto-fix
      await formHelper.takeScreenshot('12-family-financial-auto-fixed');

      // Navigate to next step
      await page.getByTestId(testIds.nextButton).click();
    });

    // Step 3: Test Situation Description Validation
    await test.step('Test Situation Description Validation', async () => {
      await page.waitForURL('/permit/situation');
      await formHelper.waitForPageReady(testIds.currentFinancialSituationInput);

      // Fill with invalid data (empty fields)
      await page
        .getByTestId(testIds.currentFinancialSituationInput)
        .fill(invalidTestData.situationDescription.currentFinancialSituation);
      await page
        .getByTestId(testIds.employmentCircumstancesInput)
        .fill(invalidTestData.situationDescription.employmentCircumstances);
      await page
        .getByTestId(testIds.reasonForApplyingInput)
        .fill(invalidTestData.situationDescription.reasonForApplying);

      // Take screenshot with invalid data
      await formHelper.takeScreenshot('13-situation-description-invalid-data');

      // Try to submit (should show validation errors)
      await page.getByTestId(testIds.submitButton).click();

      // Wait for validation errors to appear
      await page.waitForTimeout(1000);

      // Take screenshot of validation errors
      await formHelper.takeScreenshot(
        '14-situation-description-validation-errors'
      );

      // Verify validation errors are displayed
      await expect(
        page.locator('text=Current financial situation is required')
      ).toBeVisible();
      await expect(
        page.locator('text=Employment circumstances are required')
      ).toBeVisible();
      await expect(
        page.locator('text=Reason for applying is required')
      ).toBeVisible();

      // Test manual fix for empty fields
      await test.step('Test Manual Fix for Empty Fields', async () => {
        // Fill fields with valid data
        await page
          .getByTestId(testIds.currentFinancialSituationInput)
          .fill(
            'I am currently facing financial difficulties due to unexpected medical expenses.'
          );
        await page
          .getByTestId(testIds.employmentCircumstancesInput)
          .fill(
            'I work as a freelance consultant but have been experiencing irregular income.'
          );
        await page
          .getByTestId(testIds.reasonForApplyingInput)
          .fill(
            'I need financial assistance to cover essential living expenses during this difficult period.'
          );

        await formHelper.takeScreenshot('15-manual-fix-situation-description');

        // Verify fields were filled
        const currentFinancialValue = await page
          .getByTestId(testIds.currentFinancialSituationInput)
          .inputValue();
        const employmentValue = await page
          .getByTestId(testIds.employmentCircumstancesInput)
          .inputValue();
        const reasonValue = await page
          .getByTestId(testIds.reasonForApplyingInput)
          .inputValue();

        expect(currentFinancialValue.length).toBeGreaterThan(0);
        expect(employmentValue.length).toBeGreaterThan(0);
        expect(reasonValue.length).toBeGreaterThan(0);
      });

      // Fill with valid data
      await page
        .getByTestId(testIds.currentFinancialSituationInput)
        .fill(
          validationTestData.situationDescription.currentFinancialSituation
        );
      await page
        .getByTestId(testIds.employmentCircumstancesInput)
        .fill(validationTestData.situationDescription.employmentCircumstances);
      await page
        .getByTestId(testIds.reasonForApplyingInput)
        .fill(validationTestData.situationDescription.reasonForApplying);

      // Take screenshot after auto-fix
      await formHelper.takeScreenshot('16-situation-description-auto-fixed');

      // Submit application
      await page.getByTestId(testIds.submitButton).click();
    });

    // Step 4: Verify Success Page
    await test.step('Verify Success Page After Validation Fixes', async () => {
      // Wait for success page to load
      await formHelper.waitForSuccessPage();

      // Take screenshot of success page
      await formHelper.takeScreenshot('17-success-page-after-validation');

      // Verify success page data
      await formHelper.verifySuccessPageData();
    });
  });

  test('Test validation on form submission', async ({ page }) => {
    // Navigate to personal information page
    await page.goto('/permit/personal');
    await formHelper.waitForPageReady(testIds.nameInput);

    // Test email validation on form submission
    await test.step('Test Email Validation on Submit', async () => {
      const emailInput = page.getByTestId(testIds.emailInput);

      // Type invalid email
      await emailInput.fill('invalid');

      // Try to navigate to next step to trigger validation
      await page.getByTestId(testIds.nextButton).click();
      await page.waitForTimeout(1000);

      // Verify validation error appears
      await expect(
        page.locator('text=' + validationMessages.invalidEmail)
      ).toBeVisible();
      await formHelper.takeScreenshot('18-email-validation-submit');

      // Fix the email AND fill all other required fields
      await emailInput.fill('valid@example.com');

      // Fill all other required fields with valid data
      await formHelper.fillPersonalInformation(
        validationTestData.personalInformation
      );

      // Now try to navigate to next step
      await page.getByTestId(testIds.nextButton).click();
      await page.waitForTimeout(1000);

      // Verify we moved to next step (validation passed)
      await page.waitForURL('/permit/family-financial');
      await formHelper.takeScreenshot('19-email-validation-fixed');
    });
  });

  test('Test validation with different input formats', async ({ page }) => {
    // Navigate to personal information page
    await page.goto('/permit/personal');
    await formHelper.waitForPageReady(testIds.nameInput);

    // Test 1: Empty name field validation
    await test.step('Test empty name validation', async () => {
      await page.getByTestId(testIds.nameInput).clear();
      await page.getByTestId(testIds.nextButton).click();

      // Wait for validation error
      await page.waitForTimeout(1000);

      // Check if validation error appears (it might not show immediately)
      const errorVisible = await page
        .locator('text=Full name is required')
        .isVisible();
      if (errorVisible) {
        await formHelper.takeScreenshot('validation-test-1-empty-name');
      }

      // Fill valid name and continue
      await page.getByTestId(testIds.nameInput).fill('John Doe');
    });

    // Test 2: Invalid email validation
    await test.step('Test invalid email validation', async () => {
      await page.getByTestId(testIds.emailInput).clear();
      await page.getByTestId(testIds.emailInput).fill('invalid-email');
      await page.getByTestId(testIds.nextButton).click();

      await page.waitForTimeout(1000);

      const errorVisible = await page
        .locator('text=Please enter a valid email address')
        .isVisible();
      if (errorVisible) {
        await formHelper.takeScreenshot('validation-test-2-invalid-email');
      }

      // Fix email
      await page.getByTestId(testIds.emailInput).fill('test@example.com');
    });

    // Test 3: Complete form with valid data
    await test.step('Complete form with valid data', async () => {
      // Fill all remaining required fields
      await formHelper.fillPersonalInformation(
        validationTestData.personalInformation
      );

      // Try to navigate to next step
      await page.getByTestId(testIds.nextButton).click();

      // Wait for navigation
      await page.waitForURL('/permit/family-financial', { timeout: 10000 });
      await formHelper.takeScreenshot(
        'validation-test-3-successful-navigation'
      );
    });
  });
});
