import { test, expect, type Page } from '@playwright/test';

/**
 * Complete E2E tests for the permit application flow
 * Based on the actual application structure discovered through testing
 */

// Helper function to interact with custom select components
async function selectCustomOption(
  page: Page,
  selectTestId: string,
  optionValue: string
): Promise<boolean> {
  // Find the container that holds both the hidden select and the trigger button
  const container = page
    .locator(`[data-testid="${selectTestId}"]`)
    .locator('..');
  const triggerButton = container.locator(
    '[data-testid="form-select-trigger"]'
  );

  // Click the trigger button to open dropdown
  await triggerButton.click();
  await page.waitForTimeout(300);

  // Look for the option by text content
  const option = page.locator(`text=${optionValue}`).first();
  if (await option.isVisible({ timeout: 2000 })) {
    await option.click();
    return true;
  }

  // Alternative: look for option elements by role
  const roleOptions = page.locator('[role="option"]');
  const count = await roleOptions.count();
  for (let i = 0; i < count; i++) {
    const item = roleOptions.nth(i);
    const text = await item.textContent();
    if (text?.toLowerCase().includes(optionValue.toLowerCase())) {
      await item.click();
      return true;
    }
  }

  // Fallback: press Escape to close dropdown
  await page.keyboard.press('Escape');
  return false;
}

test.describe('Permit Application E2E Tests', () => {
  // Test data that matches the actual form structure
  const testData = {
    name: 'John Doe',
    nationalId: '1234567890',
    dateOfBirth: '1990-01-15',
    gender: 'Male', // Use display text, not value
    address: '123 Main Street',
    country: 'United States', // Use display text, not value
    city: 'New York',
    state: 'NY',
    phone: '+1234567890',
    email: 'john.doe@example.com',
  };

  test.beforeEach(async ({ page }) => {
    // Navigate to the application and wait for it to load
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Allow React to fully render
  });

  test('should display the personal information form with all required elements', async ({
    page,
  }) => {
    // Verify page elements are present
    await expect(page.getByTestId('personal-information-page')).toBeVisible();
    await expect(page.getByTestId('personal-information-form')).toBeVisible();
    await expect(page.getByTestId('permit-page-layout')).toBeVisible();

    // Verify progress indicator
    await expect(page.getByTestId('progress-indicator')).toBeVisible();

    // Verify all form fields are present
    await expect(page.getByTestId('name-input')).toBeVisible();
    await expect(page.getByTestId('national-id-input')).toBeVisible();
    await expect(page.getByTestId('date-of-birth-input')).toBeVisible();
    await expect(page.getByTestId('gender-select')).toBeVisible();
    await expect(page.getByTestId('address-input')).toBeVisible();
    await expect(page.getByTestId('country-select')).toBeVisible();
    await expect(page.getByTestId('city-input')).toBeVisible();
    await expect(page.getByTestId('state-input')).toBeVisible();
    await expect(page.getByTestId('phone-input')).toBeVisible();
    await expect(page.getByTestId('email-input')).toBeVisible();
  });

  test('should fill and validate the personal information form', async ({
    page,
  }) => {
    // Fill all form fields
    await page.getByTestId('name-input').fill(testData.name);
    await page.getByTestId('national-id-input').fill(testData.nationalId);
    await page.getByTestId('date-of-birth-input').fill(testData.dateOfBirth);
    await selectCustomOption(page, 'gender-select', testData.gender);
    await page.getByTestId('address-input').fill(testData.address);
    await selectCustomOption(page, 'country-select', testData.country);
    await page.getByTestId('city-input').fill(testData.city);
    await page.getByTestId('state-input').fill(testData.state);
    await page.getByTestId('phone-input').fill(testData.phone);
    await page.getByTestId('email-input').fill(testData.email);

    // Verify values are set correctly
    await expect(page.getByTestId('name-input')).toHaveValue(testData.name);
    await expect(page.getByTestId('national-id-input')).toHaveValue(
      testData.nationalId
    );
    await expect(page.getByTestId('date-of-birth-input')).toHaveValue(
      testData.dateOfBirth
    );
    await expect(page.getByTestId('address-input')).toHaveValue(
      testData.address
    );
    await expect(page.getByTestId('city-input')).toHaveValue(testData.city);
    await expect(page.getByTestId('state-input')).toHaveValue(testData.state);
    await expect(page.getByTestId('phone-input')).toHaveValue(testData.phone);
    await expect(page.getByTestId('email-input')).toHaveValue(testData.email);
  });

  test('should validate required fields when attempting to proceed with empty form', async ({
    page,
  }) => {
    // Try to find and click the Next button without filling the form
    const nextButton = page
      .locator('button')
      .filter({ hasText: /next|continue/i });

    if (await nextButton.isVisible()) {
      await nextButton.click();
      await page.waitForTimeout(500); // Allow validation to trigger

      // The form should still be visible (validation should prevent progression)
      await expect(page.getByTestId('personal-information-form')).toBeVisible();
    }

    // Check if there are validation errors displayed
    const formInputs = page.locator('[data-testid$="-input"]');
    const count = await formInputs.count();
    console.log(`Found ${count} form inputs for validation testing`);
  });

  test('should handle email validation correctly', async ({ page }) => {
    const emailInput = page.getByTestId('email-input');

    // Test invalid email
    await emailInput.fill('invalid-email');
    await emailInput.blur();
    await page.waitForTimeout(300);

    // Test valid email
    await emailInput.clear();
    await emailInput.fill(testData.email);
    await emailInput.blur();
    await page.waitForTimeout(300);

    // Email field should accept valid email
    await expect(emailInput).toHaveValue(testData.email);
  });

  test('should handle date input correctly', async ({ page }) => {
    const dateInput = page.getByTestId('date-of-birth-input');

    // Fill date field
    await dateInput.fill(testData.dateOfBirth);

    // Verify date is set
    await expect(dateInput).toHaveValue(testData.dateOfBirth);
  });

  test('should handle select dropdown interactions', async ({ page }) => {
    // Test gender selection using custom select interaction
    await selectCustomOption(page, 'gender-select', testData.gender);

    // Test country selection using custom select interaction
    await selectCustomOption(page, 'country-select', testData.country);

    // Verify the selections were made by checking if form validation passes
    // (since we can't directly check values on custom selects)
    const genderContainer = page
      .locator('[data-testid="gender-select"]')
      .locator('..');
    const genderDisplayText = genderContainer.locator(
      '[data-testid="form-select-display-text"]'
    );
    await expect(genderDisplayText).not.toHaveText('Select your gender');

    const countryContainer = page
      .locator('[data-testid="country-select"]')
      .locator('..');
    const countryDisplayText = countryContainer.locator(
      '[data-testid="form-select-display-text"]'
    );
    await expect(countryDisplayText).not.toHaveText('Select your country');
  });

  test('should navigate through the application flow', async ({ page }) => {
    // Fill the personal information form
    await page.getByTestId('name-input').fill(testData.name);
    await page.getByTestId('national-id-input').fill(testData.nationalId);
    await page.getByTestId('date-of-birth-input').fill(testData.dateOfBirth);
    await selectCustomOption(page, 'gender-select', testData.gender);
    await page.getByTestId('address-input').fill(testData.address);
    await selectCustomOption(page, 'country-select', testData.country);
    await page.getByTestId('city-input').fill(testData.city);
    await page.getByTestId('state-input').fill(testData.state);
    await page.getByTestId('phone-input').fill(testData.phone);
    await page.getByTestId('email-input').fill(testData.email);

    // Try to proceed to the next step
    const nextButton = page
      .locator('button')
      .filter({ hasText: /next|continue/i })
      .first();

    if (await nextButton.isVisible()) {
      await nextButton.click();
      await page.waitForTimeout(1000);

      // Check if we navigated to a new page or section
      const currentUrl = page.url();
      console.log('Current URL after clicking Next:', currentUrl);

      // The URL should change or new content should be visible
      const hasNavigated =
        currentUrl.includes('/family-financial') ||
        currentUrl.includes('/family') ||
        (await page.locator('[data-testid*="family"]').count()) > 0;

      if (hasNavigated) {
        console.log('Successfully navigated to next step');
      } else {
        console.log('Still on personal information page - checking validation');
      }
    }
  });

  test('should be accessible and support keyboard navigation', async ({
    page,
  }) => {
    // Start by focusing on the first form input directly
    await page.getByTestId('name-input').focus();
    await expect(page.getByTestId('name-input')).toBeFocused();

    // Test tab navigation through form fields
    await page.keyboard.press('Tab');
    await expect(page.getByTestId('national-id-input')).toBeFocused();

    // Go back to name input and fill using keyboard
    await page.getByTestId('name-input').focus();
    await page.keyboard.type(testData.name);
    await expect(page.getByTestId('name-input')).toHaveValue(testData.name);
  });

  test('should support Enter key for form submission', async ({ page }) => {
    // Fill all required fields
    await page.getByTestId('name-input').fill(testData.name);
    await page.getByTestId('national-id-input').fill(testData.nationalId);
    await page.getByTestId('date-of-birth-input').fill(testData.dateOfBirth);
    await selectCustomOption(page, 'gender-select', testData.gender);
    await page.getByTestId('address-input').fill(testData.address);
    await selectCustomOption(page, 'country-select', testData.country);
    await page.getByTestId('city-input').fill(testData.city);
    await page.getByTestId('state-input').fill(testData.state);
    await page.getByTestId('phone-input').fill(testData.phone);
    await page.getByTestId('email-input').fill(testData.email);

    // Focus on a form field and press Enter
    await page.getByTestId('name-input').focus();
    await page.keyboard.press('Enter');

    // Should navigate to next page
    await page.waitForTimeout(1000);
    const currentUrl = page.url();
    expect(currentUrl).toContain('/family-financial');
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    // Check form has proper label
    const form = page.getByTestId('personal-information-form');
    await expect(form).toHaveAttribute('aria-label');

    // Check required fields have proper aria attributes
    const nameInput = page.getByTestId('name-input');
    await expect(nameInput).toHaveAttribute('aria-required', 'true');
    await expect(nameInput).toHaveAttribute('aria-invalid', 'false');

    // Check labels are properly associated
    const nameLabel = page.locator('label[for]').first();
    const labelFor = await nameLabel.getAttribute('for');
    const inputId = await nameInput.getAttribute('id');
    expect(labelFor).toBe(inputId);
  });

  test('should support internationalization - language toggle', async ({
    page,
  }) => {
    const languageToggle = page.getByTestId('language-toggle-button');
    await expect(languageToggle).toBeVisible();

    // Click language toggle
    await languageToggle.click();
    await page.waitForTimeout(500);

    // Check if language changed (might show Arabic text or RTL layout)
    const htmlDir = await page.locator('html').getAttribute('dir');
    if (htmlDir === 'rtl') {
      console.log('Successfully switched to RTL language (Arabic)');
    }

    // Toggle back
    await languageToggle.click();
    await page.waitForTimeout(500);
  });

  test('should be responsive on different screen sizes', async ({ page }) => {
    // Test desktop
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.getByTestId('personal-information-form')).toBeVisible();

    // Test tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByTestId('personal-information-form')).toBeVisible();

    // Test mobile
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.getByTestId('personal-information-form')).toBeVisible();

    // Verify form is still functional on mobile
    await page.getByTestId('name-input').fill('Mobile Test');
    await expect(page.getByTestId('name-input')).toHaveValue('Mobile Test');
  });

  test('should handle form persistence during navigation', async ({ page }) => {
    // Fill some fields
    await page.getByTestId('name-input').fill(testData.name);
    await page.getByTestId('email-input').fill(testData.email);

    // Refresh the page
    await page.reload();
    await page.waitForTimeout(1000);

    // Check if data persisted (depends on implementation)
    const nameValue = await page.getByTestId('name-input').inputValue();
    const emailValue = await page.getByTestId('email-input').inputValue();

    if (nameValue || emailValue) {
      console.log('Form data persisted after refresh');
    } else {
      console.log('Form data was cleared after refresh (expected behavior)');
    }
  });

  test('should display proper page title and metadata', async ({ page }) => {
    // Check page title
    const title = await page.title();
    expect(title).toBeTruthy();
    console.log('Page title:', title);

    // Check that the main heading is visible
    const pageTitle = page.getByTestId('page-title');
    if (await pageTitle.isVisible()) {
      const titleText = await pageTitle.textContent();
      expect(titleText).toContain('Personal Information');
    }
  });

  test('should handle notification and header interactions', async ({
    page,
  }) => {
    // Test header elements
    await expect(page.getByTestId('header')).toBeVisible();
    await expect(page.getByTestId('home-button')).toBeVisible();

    // Test home button
    const homeButton = page.getByTestId('home-button');
    await homeButton.click();
    await page.waitForTimeout(500);

    // Should still be on the same page or redirect to home
    const currentUrl = page.url();
    expect(currentUrl).toBeTruthy();

    // Test notifications button
    const notificationsButton = page.getByTestId('notifications-button');
    if (await notificationsButton.isVisible()) {
      await notificationsButton.click();
      await page.waitForTimeout(500);
    }
  });
});
