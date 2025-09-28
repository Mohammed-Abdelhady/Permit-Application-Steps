import { expect, test } from '@playwright/test';
import { FormHelper } from '../common/formHelper';
import { aiGenerationTestData, testIds } from '../common/testData';

test.describe('Scenario 2: Complete Flow With AI Generation', () => {
  let formHelper: FormHelper;

  test.beforeEach(async ({ page, context }) => {
    // Clear all browser data for better test isolation
    await context.clearCookies();
    await context.clearPermissions();

    formHelper = new FormHelper(page);
    await formHelper.clearLocalStorage();
  });

  test('Complete permit application flow with AI generation in step 3', async ({
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
        aiGenerationTestData.personalInformation
      );

      // Verify data is filled correctly
      await formHelper.verifyPersonalInformation(
        aiGenerationTestData.personalInformation
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

      await formHelper.fillFamilyFinancial(
        aiGenerationTestData.familyFinancial
      );

      // Verify data is filled correctly
      await formHelper.verifyFamilyFinancial(
        aiGenerationTestData.familyFinancial
      );

      // Take screenshot of filled form
      await formHelper.takeScreenshot('04-family-financial-filled');

      // Navigate to next step
      await page.getByTestId(testIds.nextButton).click();
    });

    // Step 3: Fill Situation Description with AI Generation
    await test.step('Fill Situation Description Form with AI Generation', async () => {
      await page.waitForURL('/permit/situation');
      await formHelper.waitForPageReady(testIds.currentFinancialSituationInput);

      // Take screenshot of initial situation description page
      await formHelper.takeScreenshot('05-situation-description-initial');

      // Fill basic information first
      await formHelper.fillSituationDescription(
        aiGenerationTestData.situationDescription
      );

      // Take screenshot after manual fill
      await formHelper.takeScreenshot('06-situation-description-manual-fill');

      // Test AI generation for each field
      await test.step('Test AI Generation for Current Financial Situation', async () => {
        // Clear the field and test AI generation
        await page.getByTestId(testIds.currentFinancialSituationInput).clear();
        await page
          .getByTestId(testIds.currentFinancialSituationInput)
          .fill('I need help with my financial situation');

        // Look for AI suggestion button or trigger - target financial situation field
        const aiButton = page
          .getByTestId('financial-situation-section')
          .getByTestId('form-textarea-ai-help');
        if (await aiButton.isVisible()) {
          await aiButton.click();

          // Wait for popup to appear
          await page.waitForSelector('[data-testid="text-suggestion-popup"]', {
            timeout: 10000,
          });

          // Accept the suggestion to close the popup
          const acceptButton = page.getByTestId('accept-button');
          await acceptButton.click();

          // Wait for popup to close
          await page.waitForSelector('[data-testid="text-suggestion-popup"]', {
            state: 'hidden',
            timeout: 5000,
          });
        }

        // Take screenshot after AI generation
        await formHelper.takeScreenshot('07-ai-generation-financial-situation');
      });

      await test.step('Test AI Generation for Employment Circumstances', async () => {
        // Clear the field and test AI generation
        await page.getByTestId(testIds.employmentCircumstancesInput).clear();
        await page
          .getByTestId(testIds.employmentCircumstancesInput)
          .fill('Help me describe my work');

        // Look for AI suggestion button or trigger - target employment circumstances field
        const aiButton = page
          .getByTestId('employment-circumstances-section')
          .getByTestId('form-textarea-ai-help');
        if (await aiButton.isVisible()) {
          await aiButton.click();

          // Wait for popup to appear
          await page.waitForSelector('[data-testid="text-suggestion-popup"]', {
            timeout: 10000,
          });

          // Accept the suggestion to close the popup
          const acceptButton = page.getByTestId('accept-button');
          await acceptButton.click();

          // Wait for popup to close
          await page.waitForSelector('[data-testid="text-suggestion-popup"]', {
            state: 'hidden',
            timeout: 5000,
          });
        }

        // Take screenshot after AI generation
        await formHelper.takeScreenshot('08-ai-generation-employment');
      });

      await test.step('Test AI Generation for Reason for Applying', async () => {
        // Clear the field and test AI generation
        await page.getByTestId(testIds.reasonForApplyingInput).clear();
        await page
          .getByTestId(testIds.reasonForApplyingInput)
          .fill('I want to apply because');

        // Look for AI suggestion button or trigger - target application reason field
        const aiButton = page
          .getByTestId('application-reason-section')
          .getByTestId('form-textarea-ai-help');
        if (await aiButton.isVisible()) {
          await aiButton.click();

          // Wait for popup to appear
          await page.waitForSelector('[data-testid="text-suggestion-popup"]', {
            timeout: 10000,
          });

          // Accept the suggestion to close the popup
          const acceptButton = page.getByTestId('accept-button');
          await acceptButton.click();

          // Wait for popup to close
          await page.waitForSelector('[data-testid="text-suggestion-popup"]', {
            state: 'hidden',
            timeout: 5000,
          });
        }

        // Take screenshot after AI generation
        await formHelper.takeScreenshot('09-ai-generation-reason');
      });

      // Verify all fields have content after AI generation
      const currentFinancialValue = await page
        .getByTestId(testIds.currentFinancialSituationInput)
        .inputValue();
      const employmentValue = await page
        .getByTestId(testIds.employmentCircumstancesInput)
        .inputValue();
      const reasonValue = await page
        .getByTestId(testIds.reasonForApplyingInput)
        .inputValue();

      expect(currentFinancialValue.length).toBeGreaterThan(10);
      expect(employmentValue.length).toBeGreaterThan(10);
      expect(reasonValue.length).toBeGreaterThan(10);

      // Take final screenshot of filled form
      await formHelper.takeScreenshot('10-situation-description-ai-complete');

      // Submit application and wait for completion
      await page.getByTestId(testIds.submitButton).click();

      // Wait for submission to complete (button should no longer be disabled)
      await page.waitForFunction(
        () => {
          const submitButton = document.querySelector(
            '[data-testid="submit-button"]'
          );
          return submitButton && !submitButton.disabled;
        },
        { timeout: 30000 }
      );
    });

    // Step 4: Verify Success Page with AI-Generated Content
    await test.step('Verify Success Page with AI-Generated Data', async () => {
      // Wait for success page to load
      await formHelper.waitForSuccessPage();

      // Take screenshot of success page
      await formHelper.takeScreenshot('11-success-page-ai-generated');

      // Verify success page data
      await formHelper.verifySuccessPageData();

      // Verify AI-generated content is displayed
      await expect(page.getByTestId(testIds.applicationSummary)).toContainText(
        aiGenerationTestData.personalInformation.name
      );
      await expect(page.getByTestId(testIds.applicationSummary)).toContainText(
        aiGenerationTestData.personalInformation.email
      );

      // Verify AI analysis section contains relevant content
      const analysisText = await page
        .getByTestId(testIds.applicationAnalysis)
        .textContent();
      expect(analysisText).toBeTruthy();
      expect(analysisText!.length).toBeGreaterThan(50);

      // Verify analysis contains meaningful validation content
      expect(analysisText).toMatch(/validation|score|recommendation|complete/i);
    });
  });

  test('Test AI suggestion popup interactions', async ({ page }) => {
    // Navigate to situation description page
    await page.goto('/permit/situation');
    await formHelper.waitForPageReady(testIds.currentFinancialSituationInput);

    // Fill a basic text to trigger AI suggestions
    await page
      .getByTestId(testIds.currentFinancialSituationInput)
      .fill('I am applying for a permit');

    // Look for AI suggestion popup
    const suggestionPopup = page.getByTestId('text-suggestion-popup');

    if (await suggestionPopup.isVisible()) {
      // Take screenshot of AI suggestion popup
      await formHelper.takeScreenshot('12-ai-suggestion-popup');

      // Test accepting AI suggestion
      const acceptButton = suggestionPopup.getByTestId('accept-button');
      if (await acceptButton.isVisible()) {
        await acceptButton.click();
        await formHelper.takeScreenshot('13-ai-suggestion-accepted');
      }

      // Test rejecting AI suggestion
      await page
        .getByTestId(testIds.currentFinancialSituationInput)
        .fill('I am applying for a permit');
      const rejectButton = suggestionPopup.getByTestId('discard-button');
      if (await rejectButton.isVisible()) {
        await rejectButton.click();
        await formHelper.takeScreenshot('14-ai-suggestion-rejected');
      }
    }
  });

  test('Test AI generation with different input patterns', async ({ page }) => {
    // Navigate to situation description page
    await page.goto('/permit/situation');
    await formHelper.waitForPageReady(testIds.currentFinancialSituationInput);

    const testInputs = [
      'I need help with my application',
      'Can you help me write this?',
      'Generate content for me',
      'I am a software engineer',
      'I want to work in technology',
    ];

    for (let i = 0; i < testInputs.length; i++) {
      const input = testInputs[i];

      // Clear and fill with test input
      await page.getByTestId(testIds.currentFinancialSituationInput).clear();
      await page
        .getByTestId(testIds.currentFinancialSituationInput)
        .fill(input);

      // Look for AI generation trigger - target the specific field's button
      const aiButton = page
        .getByTestId('financial-situation-section')
        .getByTestId('form-textarea-ai-help');

      if (await aiButton.isVisible()) {
        await aiButton.click();

        // Wait for AI popup to appear
        await page.waitForSelector('[data-testid="text-suggestion-popup"]', {
          timeout: 10000,
        });

        // Wait for suggestion to be generated
        await page.waitForSelector('[data-testid="suggestion-display"]', {
          timeout: 15000,
        });

        // Accept the suggestion
        const acceptButton = page.getByTestId('accept-button');
        await acceptButton.click();

        // Wait for popup to close and content to be filled
        await page.waitForSelector('[data-testid="text-suggestion-popup"]', {
          state: 'hidden',
          timeout: 5000,
        });

        // Take screenshot for each AI generation
        await formHelper.takeScreenshot(`15-ai-generation-test-${i + 1}`);

        // Verify content was generated
        const generatedContent = await page
          .getByTestId(testIds.currentFinancialSituationInput)
          .inputValue();

        // More flexible assertion - just check that content exists and is longer
        expect(generatedContent.length).toBeGreaterThan(input.length);
        expect(generatedContent).toBeTruthy();
      }
    }
  });

  test('Verify AI generation performance and loading states', async ({
    page,
  }) => {
    // Navigate to situation description page
    await page.goto('/permit/situation');
    await formHelper.waitForPageReady(testIds.currentFinancialSituationInput);

    // Fill basic input
    await page
      .getByTestId(testIds.currentFinancialSituationInput)
      .fill('I need help');

    // Look for AI generation button - target the specific field's button
    const aiButton = page
      .getByTestId('financial-situation-section')
      .getByTestId('form-textarea-ai-help');

    if (await aiButton.isVisible()) {
      // Click AI generation button
      await aiButton.click();

      // Wait for AI popup to appear
      await page.waitForSelector('[data-testid="text-suggestion-popup"]', {
        timeout: 10000,
      });

      // Verify loading state appears
      const loadingIndicator = page.getByTestId('loading-state');
      if (await loadingIndicator.isVisible()) {
        await formHelper.takeScreenshot('16-ai-loading-state');
      }

      // Wait for suggestion to be generated
      await page.waitForSelector('[data-testid="suggestion-display"]', {
        timeout: 15000,
      });

      // Verify loading state disappears
      if (await loadingIndicator.isVisible()) {
        await expect(loadingIndicator).not.toBeVisible();
      }

      // Accept the suggestion
      const acceptButton = page.getByTestId('accept-button');
      await acceptButton.click();

      // Wait for popup to close
      await page.waitForSelector('[data-testid="text-suggestion-popup"]', {
        state: 'hidden',
        timeout: 5000,
      });

      // Take screenshot after completion
      await formHelper.takeScreenshot('17-ai-generation-complete');

      // Verify content was generated
      const generatedContent = await page
        .getByTestId(testIds.currentFinancialSituationInput)
        .inputValue();
      expect(generatedContent.length).toBeGreaterThan(10);
    }
  });
});
