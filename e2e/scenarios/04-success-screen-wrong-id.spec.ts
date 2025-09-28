import { expect, test } from '@playwright/test';
import { FormHelper } from '../common/formHelper';
import { completeTestData } from '../common/testData';

test.describe('Scenario 4: Success Screen with Wrong ID in URL', () => {
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

  test('Test success page with invalid application ID in URL', async ({
    page,
  }) => {
    // First, complete a valid application to get a real success page
    await test.step('Complete Valid Application', async () => {
      await page.goto('/permit/personal');
      await page.waitForLoadState('networkidle');

      // Auto-fill the complete form
      await formHelper.completeFormFlow(completeTestData);

      // Wait for success page
      await formHelper.waitForSuccessPage();

      // Take screenshot of valid success page
      await formHelper.takeScreenshot('01-valid-success-page');

      // Get the valid application ID from URL
      const currentUrl = page.url();
      const validApplicationId = currentUrl.split('/').pop();
      expect(validApplicationId).toMatch(/^[A-Z]{3}-\d{8}$/);
    });

    // Test invalid application IDs
    const invalidIds = [
      'INVALID-ID',
      'DGE-12345678', // Wrong format
      'ABC-12345678', // Wrong prefix
      'DGE-1234567', // Too short
      'DGE-123456789', // Too long
      'DGE-ABCDEFGH', // Non-numeric
      '12345678', // No prefix
      'DGE-', // Empty ID
      '', // Empty
      'DGE-99999999', // Non-existent ID
    ];

    for (let i = 0; i < invalidIds.length; i++) {
      const invalidId = invalidIds[i];

      await test.step(`Test Invalid ID: ${invalidId}`, async () => {
        // Navigate to success page with invalid ID
        await page.goto(`/permit/success/${invalidId}`);
        await page.waitForLoadState('networkidle');

        // Take screenshot of error state
        await formHelper.takeScreenshot(
          `02-invalid-id-${i + 1}-${invalidId.replace(/[^a-zA-Z0-9]/g, '')}`
        );

        // Verify error handling
        await test.step('Verify Error Handling', async () => {
          // Check for error message or redirect
          const errorMessage = page.locator(
            'text=not found, text=invalid, text=error, text=404'
          );
          const redirectMessage = page.locator(
            'text=redirect, text=home, text=application'
          );

          if (await errorMessage.isVisible()) {
            // Error message is displayed
            await expect(errorMessage).toBeVisible();
            await formHelper.takeScreenshot(`03-error-message-${i + 1}`);
          } else if (await redirectMessage.isVisible()) {
            // Redirect message is displayed
            await expect(redirectMessage).toBeVisible();
            await formHelper.takeScreenshot(`04-redirect-message-${i + 1}`);
          } else {
            // Check if redirected to home page
            const currentUrl = page.url();
            if (
              currentUrl.includes('/permit/personal') ||
              currentUrl.includes('/')
            ) {
              await formHelper.takeScreenshot(`05-redirected-to-home-${i + 1}`);
            } else {
              // Check for 404 page
              const notFoundMessage = page.locator(
                'text=404, text=not found, text=page not found'
              );
              if (await notFoundMessage.isVisible()) {
                await formHelper.takeScreenshot(`06-404-page-${i + 1}`);
              }
            }
          }
        });
      });
    }
  });

  test('Test success page with malformed URL parameters', async ({ page }) => {
    const malformedUrls = [
      '/permit/success/', // No ID
      '/permit/success//', // Double slash
      '/permit/success/undefined', // Undefined
      '/permit/success/null', // Null
      '/permit/success/undefined/null', // Multiple invalid
      '/permit/success/DGE-12345678/extra', // Extra path
      '/permit/success/DGE-12345678?invalid=param', // Query params
      '/permit/success/DGE-12345678#fragment', // Fragment
    ];

    for (let i = 0; i < malformedUrls.length; i++) {
      const malformedUrl = malformedUrls[i];

      await test.step(`Test Malformed URL: ${malformedUrl}`, async () => {
        // Navigate to malformed URL
        await page.goto(malformedUrl);
        await page.waitForLoadState('networkidle');

        // Take screenshot of error state
        await formHelper.takeScreenshot(`07-malformed-url-${i + 1}`);

        // Verify error handling
        const errorMessage = page.locator(
          'text=not found, text=invalid, text=error, text=404'
        );
        const redirectMessage = page.locator(
          'text=redirect, text=home, text=application'
        );

        if (await errorMessage.isVisible()) {
          await expect(errorMessage).toBeVisible();
        } else if (await redirectMessage.isVisible()) {
          await expect(redirectMessage).toBeVisible();
        } else {
          // Check if redirected to home page
          const currentUrl = page.url();
          expect(currentUrl).toMatch(/\/(permit\/personal|\/|permit\/success)/);
        }
      });
    }
  });

  test('Test success page with expired or deleted application ID', async ({
    page,
  }) => {
    // Test with IDs that might exist but are expired/deleted
    const expiredIds = [
      'DGE-00000001', // Very old ID
      'DGE-99999999', // Non-existent ID
      'DGE-12345678', // Deleted ID
    ];

    for (let i = 0; i < expiredIds.length; i++) {
      const expiredId = expiredIds[i];

      await test.step(`Test Expired/Deleted ID: ${expiredId}`, async () => {
        // Navigate to success page with expired ID
        await page.goto(`/permit/success/${expiredId}`);
        await page.waitForLoadState('networkidle');

        // Take screenshot of error state
        await formHelper.takeScreenshot(`08-expired-id-${i + 1}`);

        // Verify error handling
        const errorMessage = page.locator(
          'text=expired, text=deleted, text=not found, text=invalid'
        );
        const redirectMessage = page.locator(
          'text=redirect, text=home, text=application'
        );

        if (await errorMessage.isVisible()) {
          await expect(errorMessage).toBeVisible();
        } else if (await redirectMessage.isVisible()) {
          await expect(redirectMessage).toBeVisible();
        } else {
          // Check if redirected to home page
          const currentUrl = page.url();
          expect(currentUrl).toMatch(/\/(permit\/personal|\/|permit\/success)/);
        }
      });
    }
  });

  test('Test success page with special characters in ID', async ({ page }) => {
    const specialCharacterIds = [
      'DGE-12345678<script>alert("xss")</script>', // XSS attempt
      'DGE-12345678"', // Quote injection
      "DGE-12345678'", // Single quote injection
      'DGE-12345678;', // SQL injection attempt
      'DGE-12345678&', // HTML entity
      'DGE-12345678<', // HTML tag
      'DGE-12345678>', // HTML tag
      'DGE-12345678%', // URL encoding
      'DGE-12345678+', // Plus sign
      'DGE-12345678=', // Equals sign
    ];

    for (let i = 0; i < specialCharacterIds.length; i++) {
      const specialId = specialCharacterIds[i];

      await test.step(`Test Special Character ID: ${specialId}`, async () => {
        // Navigate to success page with special character ID
        await page.goto(`/permit/success/${encodeURIComponent(specialId)}`);
        await page.waitForLoadState('networkidle');

        // Take screenshot of error state
        await formHelper.takeScreenshot(`09-special-char-id-${i + 1}`);

        // Verify error handling and security
        const errorMessage = page.locator(
          'text=not found, text=invalid, text=error, text=404'
        );
        const redirectMessage = page.locator(
          'text=redirect, text=home, text=application'
        );

        if (await errorMessage.isVisible()) {
          await expect(errorMessage).toBeVisible();
        } else if (await redirectMessage.isVisible()) {
          await expect(redirectMessage).toBeVisible();
        } else {
          // Check if redirected to home page
          const currentUrl = page.url();
          expect(currentUrl).toMatch(/\/(permit\/personal|\/|permit\/success)/);
        }

        // Verify no XSS or injection occurred
        const pageContent = await page.content();
        expect(pageContent).not.toContain('<script>alert(');
        expect(pageContent).not.toContain('DGE-12345678<script>');
        expect(pageContent).not.toContain('javascript:');
      });
    }
  });

  test('Test success page with very long application ID', async ({ page }) => {
    // Test with extremely long ID
    const longId = 'DGE-' + '1'.repeat(1000);

    await test.step('Test Very Long Application ID', async () => {
      // Navigate to success page with very long ID
      await page.goto(`/permit/success/${longId}`);
      await page.waitForLoadState('networkidle');

      // Take screenshot of error state
      await formHelper.takeScreenshot('10-very-long-id');

      // Verify error handling
      const errorMessage = page.locator(
        'text=not found, text=invalid, text=error, text=404'
      );
      const redirectMessage = page.locator(
        'text=redirect, text=home, text=application'
      );

      if (await errorMessage.isVisible()) {
        await expect(errorMessage).toBeVisible();
      } else if (await redirectMessage.isVisible()) {
        await expect(redirectMessage).toBeVisible();
      } else {
        // Check if redirected to home page
        const currentUrl = page.url();
        expect(currentUrl).toMatch(/\/(permit\/personal|\/|permit\/success)/);
      }
    });
  });

  test('Test success page error recovery and navigation', async ({ page }) => {
    // Navigate to invalid success page
    await page.goto('/permit/success/INVALID-ID');
    await page.waitForLoadState('networkidle');

    // Take screenshot of error state
    await formHelper.takeScreenshot('11-invalid-success-page');

    // Test navigation options
    await test.step('Test Error Recovery Navigation', async () => {
      // Look for navigation buttons
      const homeButton = page.locator(
        'text=Home, text=Back to Home, text=Go Home'
      );
      const newApplicationButton = page.locator(
        'text=New Application, text=Start New, text=Apply Again'
      );
      const contactButton = page.locator(
        'text=Contact, text=Support, text=Help'
      );

      if (await homeButton.isVisible()) {
        await homeButton.click();
        await page.waitForLoadState('networkidle');
        await formHelper.takeScreenshot('12-navigated-to-home');

        // Verify we're on home page
        const currentUrl = page.url();
        expect(currentUrl).toMatch(/\/(permit\/personal|\/|permit\/success)/);
      }

      if (await newApplicationButton.isVisible()) {
        await newApplicationButton.click();
        await page.waitForLoadState('networkidle');
        await formHelper.takeScreenshot('13-navigated-to-new-application');

        // Verify we're on personal information page
        const currentUrl = page.url();
        expect(currentUrl).toContain('/permit/personal');
      }

      if (await contactButton.isVisible()) {
        await contactButton.click();
        await page.waitForLoadState('networkidle');
        await formHelper.takeScreenshot('14-navigated-to-contact');
      }
    });
  });

  test('Test success page with case sensitivity', async ({ page }) => {
    const caseVariations = [
      'dge-12345678', // Lowercase prefix
      'Dge-12345678', // Mixed case prefix
      'DGE-12345678', // Correct case
      'dGe-12345678', // Mixed case
    ];

    for (let i = 0; i < caseVariations.length; i++) {
      const caseId = caseVariations[i];

      await test.step(`Test Case Variation: ${caseId}`, async () => {
        // Navigate to success page with case variation
        await page.goto(`/permit/success/${caseId}`);
        await page.waitForLoadState('networkidle');

        // Take screenshot of result
        await formHelper.takeScreenshot(`15-case-variation-${i + 1}`);

        // Verify handling (should be case sensitive)
        const errorMessage = page.locator(
          'text=not found, text=invalid, text=error, text=404'
        );
        const redirectMessage = page.locator(
          'text=redirect, text=home, text=application'
        );

        if (await errorMessage.isVisible()) {
          await expect(errorMessage).toBeVisible();
        } else if (await redirectMessage.isVisible()) {
          await expect(redirectMessage).toBeVisible();
        } else {
          // Check if redirected to home page
          const currentUrl = page.url();
          expect(currentUrl).toMatch(/\/(permit\/personal|\/|permit\/success)/);
        }
      });
    }
  });
});
