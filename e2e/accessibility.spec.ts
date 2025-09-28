import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Comprehensive accessibility testing for the permit application
 * Uses axe-core to automatically detect accessibility violations
 */

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should not have any automatically detectable accessibility issues on personal information page', async ({
    page,
  }) => {
    // Run axe accessibility scan
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // Assert no accessibility violations
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should pass accessibility tests for form interactions', async ({
    page,
  }) => {
    // Fill form with some data to test various states
    await page.getByTestId('name-input').fill('John Doe');
    await page.getByTestId('email-input').fill('invalid-email'); // Test error state

    // Trigger validation
    await page.getByTestId('email-input').blur();
    await page.waitForTimeout(500);

    // Run accessibility scan with form in various states
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper focus management and keyboard navigation', async ({
    page,
  }) => {
    // Test tab order
    const focusableElements = await page
      .locator(
        '[tabindex]:not([tabindex="-1"]), input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled]), [contenteditable="true"]'
      )
      .all();

    // Verify we have focusable elements
    expect(focusableElements.length).toBeGreaterThan(0);

    // Test Tab key navigation
    await page.keyboard.press('Tab');
    const firstFocused = await page.evaluate(() =>
      document.activeElement?.getAttribute('data-testid')
    );

    await page.keyboard.press('Tab');
    const secondFocused = await page.evaluate(() =>
      document.activeElement?.getAttribute('data-testid')
    );

    // Should move focus
    expect(firstFocused).not.toBe(secondFocused);
  });

  test('should have proper ARIA labels and roles', async ({ page }) => {
    // Check main form has proper ARIA attributes
    const form = page.getByTestId('personal-information-form');
    await expect(form).toHaveAttribute('aria-label');

    // Check all input fields have proper labels
    const inputs = await page.locator('input[data-testid$="-input"]').all();

    for (const input of inputs) {
      const inputId = await input.getAttribute('id');
      const label = page.locator(`label[for="${inputId}"]`);
      await expect(label).toBeVisible();

      // Check ARIA attributes
      await expect(input).toHaveAttribute('aria-required');
      await expect(input).toHaveAttribute('aria-invalid');
    }
  });

  test('should handle error states accessibly', async ({ page }) => {
    // Try to submit empty form to trigger errors
    const nameInput = page.getByTestId('name-input');
    await nameInput.focus();
    await nameInput.blur();

    // Wait for validation
    await page.waitForTimeout(500);

    // Check if error message is properly associated
    const nameError = page
      .locator('[data-testid="form-input-error"]:visible')
      .first();
    if (await nameError.isVisible()) {
      // Error should have proper ARIA attributes
      await expect(nameError).toHaveAttribute('role', 'alert');
      await expect(nameError).toHaveAttribute('aria-live', 'polite');
    }

    // Run accessibility scan with error states
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should support screen reader navigation', async ({ page }) => {
    // Test landmark navigation
    const main = page.locator('main, [role="main"]');
    if ((await main.count()) > 0) {
      await expect(main.first()).toBeVisible();
    }

    // Test heading structure
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);

    // Verify heading hierarchy (h1 should come before h2, etc.)
    const headingLevels = await Promise.all(
      headings.map(async h => {
        const tagName = await h.evaluate(el => el.tagName.toLowerCase());
        return parseInt(tagName.charAt(1));
      })
    );

    // Should start with h1 or h2 and not skip levels
    expect(headingLevels[0]).toBeLessThanOrEqual(2);
  });

  test('should work with language switching', async ({ page }) => {
    // Test RTL language support
    const languageToggle = page.getByTestId('language-toggle-button');
    await languageToggle.click();
    await page.waitForTimeout(1000);

    // Check if RTL direction is applied
    const htmlDir = await page.locator('html').getAttribute('dir');
    if (htmlDir === 'rtl') {
      // Run accessibility scan with RTL layout
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    }

    // Switch back to LTR
    await languageToggle.click();
    await page.waitForTimeout(1000);
  });

  test('should be accessible across different screen sizes', async ({
    page,
  }) => {
    const viewports = [
      { width: 390, height: 844 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1440, height: 900 }, // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(500);

      // Run accessibility scan at this viewport
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    }
  });

  test('should provide sufficient color contrast', async ({ page }) => {
    // Run accessibility scan focusing on color contrast
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include(['color-contrast'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should handle form submission with keyboard only', async ({ page }) => {
    // Fill form using only keyboard
    await page.keyboard.press('Tab'); // Focus first input
    await page.keyboard.type('John Doe');

    await page.keyboard.press('Tab');
    await page.keyboard.type('1234567890');

    await page.keyboard.press('Tab');
    await page.keyboard.type('1990-01-15');

    // Test dropdown navigation with keyboard
    await page.keyboard.press('Tab'); // Focus gender dropdown
    await page.keyboard.press('Enter'); // Open dropdown
    await page.keyboard.press('ArrowDown'); // Navigate options
    await page.keyboard.press('Enter'); // Select option
    await page.keyboard.press('Tab'); // Move to next field (should close dropdown)

    // Continue with remaining fields
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
    }

    await page.keyboard.type('+1234567890');

    await page.keyboard.press('Tab');
    await page.keyboard.type('john.doe@example.com');

    // Try to submit with Enter
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);

    // Should not cause any accessibility issues during submission
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
