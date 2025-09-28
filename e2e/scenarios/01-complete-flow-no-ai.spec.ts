import { expect, test } from '@playwright/test';
import { FormHelper } from '../common/formHelper';
import { completeTestData, testIds } from '../common/testData';

test.describe('Scenario 1: Complete Flow Without AI Generation', () => {
  let formHelper: FormHelper;

  test.beforeEach(async ({ page, context }) => {
    // Clear all browser data for better test isolation
    await context.clearCookies();
    await context.clearPermissions();

    formHelper = new FormHelper(page);
    await formHelper.clearLocalStorage();
  });

  test('Complete permit application flow with auto-fill and success verification', async ({
    page,
  }) => {
    // Start the application flow
    await page.goto('/permit/personal');
    await formHelper.waitForPageReady(testIds.nameInput);

    // Take initial screenshot
    await formHelper.takeScreenshot('01-personal-information-initial');

    // Step 1: Fill Personal Information (Auto-fill)
    await test.step('Fill Personal Information Form', async () => {
      await formHelper.fillPersonalInformation(
        completeTestData.personalInformation
      );

      // Verify data is filled correctly
      await formHelper.verifyPersonalInformation(
        completeTestData.personalInformation
      );

      // Take screenshot of filled form
      await formHelper.takeScreenshot('02-personal-information-filled');

      // Navigate to next step
      await page.getByTestId(testIds.nextButton).click();
    });

    // Step 2: Fill Family Financial Information (Auto-fill)
    await test.step('Fill Family Financial Form', async () => {
      await page.waitForURL('/permit/family-financial');
      await formHelper.waitForPageReady(testIds.maritalStatusSelect);

      // Take screenshot of initial family financial page
      await formHelper.takeScreenshot('03-family-financial-initial');

      await formHelper.fillFamilyFinancial(completeTestData.familyFinancial);

      // Verify data is filled correctly
      await formHelper.verifyFamilyFinancial(completeTestData.familyFinancial);

      // Take screenshot of filled form
      await formHelper.takeScreenshot('04-family-financial-filled');

      // Navigate to next step
      await page.getByTestId(testIds.nextButton).click();
    });

    // Step 3: Fill Situation Description (Auto-fill, No AI Generation)
    await test.step('Fill Situation Description Form', async () => {
      await page.waitForURL('/permit/situation');
      await formHelper.waitForPageReady(testIds.currentFinancialSituationInput);

      // Take screenshot of initial situation description page
      await formHelper.takeScreenshot('05-situation-description-initial');

      await formHelper.fillSituationDescription(
        completeTestData.situationDescription
      );

      // Verify data is filled correctly
      await formHelper.verifySituationDescription(
        completeTestData.situationDescription
      );

      // Take screenshot of filled form
      await formHelper.takeScreenshot('06-situation-description-filled');

      // Submit application
      await page.getByTestId(testIds.submitButton).click();
    });

    // Step 4: Verify Success Page
    await test.step('Verify Success Page with Complete Data', async () => {
      // Wait for success page to load
      await formHelper.waitForSuccessPage();

      // Take screenshot of success page
      await formHelper.takeScreenshot('07-success-page-complete');

      // Verify success page data
      await formHelper.verifySuccessPageData();

      // Verify specific data is displayed correctly
      await expect(page.getByTestId(testIds.applicationSummary)).toContainText(
        completeTestData.personalInformation.name
      );
      await expect(page.getByTestId(testIds.applicationSummary)).toContainText(
        completeTestData.personalInformation.email
      );
      await expect(page.getByTestId(testIds.applicationSummary)).toContainText(
        completeTestData.familyFinancial.monthlyIncome
      );
      await expect(page.getByTestId(testIds.applicationSummary)).toContainText(
        completeTestData.situationDescription.currentFinancialSituation
      );
    });
  });

  test('Verify form data persistence during navigation', async ({ page }) => {
    // Start the application flow
    await page.goto('/permit/personal');
    await formHelper.waitForPageReady(testIds.nameInput);

    // Fill personal information
    await formHelper.fillPersonalInformation(
      completeTestData.personalInformation
    );
    await page.getByTestId(testIds.nextButton).click();

    // Fill family financial information
    await page.waitForURL('/permit/family-financial');
    await formHelper.fillFamilyFinancial(completeTestData.familyFinancial);
    await page.getByTestId(testIds.nextButton).click();

    // Navigate back to verify data persistence
    await page.waitForURL('/permit/situation');
    await page.getByTestId(testIds.previousButton).click();
    await page.waitForURL('/permit/family-financial');

    // Verify family financial data is preserved
    await formHelper.verifyFamilyFinancial(completeTestData.familyFinancial);

    // Navigate back to personal information
    await page.getByTestId(testIds.previousButton).click();
    await page.waitForURL('/permit/personal');

    // Verify personal information data is preserved
    await formHelper.verifyPersonalInformation(
      completeTestData.personalInformation
    );
  });

  test('Verify progress indicator updates correctly', async ({ page }) => {
    // Start the application flow
    await page.goto('/permit/personal');
    await formHelper.waitForPageReady(testIds.nameInput);

    // Verify step 1 is active
    await expect(page.getByTestId(testIds.step1Circle)).toHaveClass(
      /bg-blue-600/
    );

    // Fill and navigate to step 2
    await formHelper.fillPersonalInformation(
      completeTestData.personalInformation
    );
    await page.getByTestId(testIds.nextButton).click();
    await page.waitForURL('/permit/family-financial');

    // Verify step 2 is active
    await expect(page.getByTestId(testIds.step2Circle)).toHaveClass(
      /bg-blue-600/
    );

    // Fill and navigate to step 3
    await formHelper.fillFamilyFinancial(completeTestData.familyFinancial);
    await page.getByTestId(testIds.nextButton).click();
    await page.waitForURL('/permit/situation');

    // Verify step 3 is active
    await expect(page.getByTestId(testIds.step3Circle)).toHaveClass(
      /bg-blue-600/
    );
  });

  test('Verify form submission with loading states', async ({ page }) => {
    // Complete the form flow
    await page.goto('/permit/personal');
    await formHelper.waitForPageReady(testIds.nameInput);

    await formHelper.fillPersonalInformation(
      completeTestData.personalInformation
    );
    await page.getByTestId(testIds.nextButton).click();

    await page.waitForURL('/permit/family-financial');
    await formHelper.fillFamilyFinancial(completeTestData.familyFinancial);
    await page.getByTestId(testIds.nextButton).click();

    await page.waitForURL('/permit/situation');
    await formHelper.fillSituationDescription(
      completeTestData.situationDescription
    );

    // Submit and verify loading state
    await page.getByTestId(testIds.submitButton).click();

    // Verify submit button is disabled during submission
    await expect(page.getByTestId(testIds.submitButton)).toBeDisabled();

    // Wait for success page
    await formHelper.waitForSuccessPage();

    // Verify success page loaded
    await expect(page.getByTestId(testIds.successHeader)).toBeVisible();
  });
});
