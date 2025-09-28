import { Page, expect } from '@playwright/test';
import {
  TestData,
  aiGenerationTestData,
  buttonNames,
  completeTestData,
  selectOptions,
  testIds,
  validationTestData,
} from './testData';

export class FormHelper {
  constructor(private page: Page) {}

  /**
   * Auto-fill Personal Information form
   */
  async fillPersonalInformation(data: TestData['personalInformation']) {
    await this.page.getByTestId(testIds.nameInput).fill(data.name);
    await this.page.getByTestId(testIds.nationalIdInput).fill(data.nationalId);

    // Convert date from MM/DD/YYYY to YYYY-MM-DD format for HTML date input
    const formattedDate = this.convertDateFormat(data.dateOfBirth);
    await this.page.getByTestId(testIds.dateOfBirthInput).fill(formattedDate);

    // Select gender - check if dropdown is already open/selected
    const genderButton = this.page.getByRole('button', {
      name: buttonNames.selectGender,
    });
    if (await genderButton.isVisible()) {
      await genderButton.click();
      await this.page.getByTestId(selectOptions.gender[data.gender]).click();
    }

    await this.page.getByTestId(testIds.addressInput).fill(data.address);

    // Select country - check if dropdown is already open/selected
    const countryButton = this.page.getByRole('button', {
      name: buttonNames.selectCountry,
    });
    if (await countryButton.isVisible()) {
      await countryButton.click();
      await this.page
        .getByTestId(
          selectOptions.country[
            data.country as keyof typeof selectOptions.country
          ]
        )
        .click();
    }

    await this.page.getByTestId(testIds.cityInput).fill(data.city);
    await this.page.getByTestId(testIds.stateInput).fill(data.state);
    await this.page.getByTestId(testIds.emailInput).fill(data.email);
    await this.page.getByTestId(testIds.phoneInput).fill(data.phoneNumber);
  }

  /**
   * Auto-fill Family Financial form
   */
  async fillFamilyFinancial(data: TestData['familyFinancial']) {
    // Select marital status
    await this.page
      .getByRole('button', { name: buttonNames.selectMaritalStatus })
      .click();
    await this.page
      .getByTestId(selectOptions.maritalStatus[data.maritalStatus])
      .click();

    await this.page.getByTestId(testIds.dependentsInput).fill(data.dependents);

    // Select employment status
    await this.page
      .getByRole('button', { name: buttonNames.selectEmploymentStatus })
      .click();
    await this.page
      .getByTestId(selectOptions.employmentStatus[data.employmentStatus])
      .click();

    await this.page
      .getByTestId(testIds.monthlyIncomeInput)
      .fill(data.monthlyIncome);

    // Select housing status
    await this.page
      .getByRole('button', { name: buttonNames.selectHousingStatus })
      .click();
    await this.page
      .getByTestId(selectOptions.housingStatus[data.housingStatus])
      .click();
  }

  /**
   * Auto-fill Situation Description form
   */
  async fillSituationDescription(data: TestData['situationDescription']) {
    await this.page
      .getByTestId(testIds.currentFinancialSituationInput)
      .fill(data.currentFinancialSituation);
    await this.page
      .getByTestId(testIds.employmentCircumstancesInput)
      .fill(data.employmentCircumstances);
    await this.page
      .getByTestId(testIds.reasonForApplyingInput)
      .fill(data.reasonForApplying);
  }

  /**
   * Complete entire form flow with auto-fill
   */
  async completeFormFlow(data: TestData) {
    // Step 1: Personal Information
    await this.page.waitForURL('/permit/personal');
    await this.page.waitForLoadState('networkidle');
    await this.fillPersonalInformation(data.personalInformation);
    await this.page.getByTestId(testIds.nextButton).click();

    // Step 2: Family Financial
    await this.page.waitForURL('/permit/family-financial');
    await this.page.waitForLoadState('networkidle');
    await this.fillFamilyFinancial(data.familyFinancial);
    await this.page.getByTestId(testIds.nextButton).click();

    // Step 3: Situation Description
    await this.page.waitForURL('/permit/situation');
    await this.page.waitForLoadState('networkidle');
    await this.fillSituationDescription(data.situationDescription);
    await this.page.getByTestId(testIds.submitButton).click();
  }

  /**
   * Verify form data is filled correctly
   */
  async verifyPersonalInformation(data: TestData['personalInformation']) {
    await expect(this.page.getByTestId(testIds.nameInput)).toHaveValue(
      data.name
    );
    await expect(this.page.getByTestId(testIds.nationalIdInput)).toHaveValue(
      data.nationalId
    );
    // Convert date format for verification to match what's actually in the input
    const formattedDate = this.convertDateFormat(data.dateOfBirth);
    await expect(this.page.getByTestId(testIds.dateOfBirthInput)).toHaveValue(
      formattedDate
    );
    await expect(this.page.getByTestId(testIds.addressInput)).toHaveValue(
      data.address
    );
    await expect(this.page.getByTestId(testIds.cityInput)).toHaveValue(
      data.city
    );
    await expect(this.page.getByTestId(testIds.stateInput)).toHaveValue(
      data.state
    );
    await expect(this.page.getByTestId(testIds.emailInput)).toHaveValue(
      data.email
    );
    await expect(this.page.getByTestId(testIds.phoneInput)).toHaveValue(
      data.phoneNumber
    );
  }

  async verifyFamilyFinancial(data: TestData['familyFinancial']) {
    await expect(this.page.getByTestId(testIds.dependentsInput)).toHaveValue(
      data.dependents
    );
    await expect(this.page.getByTestId(testIds.monthlyIncomeInput)).toHaveValue(
      data.monthlyIncome
    );
  }

  async verifySituationDescription(data: TestData['situationDescription']) {
    await expect(
      this.page.getByTestId(testIds.currentFinancialSituationInput)
    ).toHaveValue(data.currentFinancialSituation);
    await expect(
      this.page.getByTestId(testIds.employmentCircumstancesInput)
    ).toHaveValue(data.employmentCircumstances);
    await expect(
      this.page.getByTestId(testIds.reasonForApplyingInput)
    ).toHaveValue(data.reasonForApplying);
  }

  /**
   * Navigate between steps
   */
  async navigateToStep(step: 1 | 2 | 3) {
    const stepMap = {
      1: '/permit/personal',
      2: '/permit/family-financial',
      3: '/permit/situation',
    };
    await this.page.goto(stepMap[step]);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for success page
   */
  async waitForSuccessPage() {
    await this.page.waitForURL(/\/permit\/success\/.+/);
    await this.page.waitForLoadState('networkidle');
    await expect(this.page.getByTestId(testIds.successHeader)).toBeVisible();
  }

  /**
   * Verify success page data
   */
  async verifySuccessPageData() {
    // Verify application ID format
    const applicationIdElement = this.page.getByTestId(testIds.applicationId);
    await expect(applicationIdElement).toBeVisible();
    const applicationId = await applicationIdElement.textContent();
    expect(applicationId).toMatch(/^[A-Z]{3}-\d{8}$/);

    // Verify submission date format
    const submissionDateElement = this.page.getByTestId(testIds.submissionDate);
    await expect(submissionDateElement).toBeVisible();
    const submissionDate = await submissionDateElement.textContent();
    expect(submissionDate).toMatch(/^\w+\s+\d{1,2},\s+\d{4}$/);

    // Verify summary sections are visible
    await expect(
      this.page.getByTestId(testIds.applicationSummary)
    ).toBeVisible();
    await expect(
      this.page.getByTestId(testIds.applicationAnalysis)
    ).toBeVisible();
  }

  /**
   * Clear localStorage with better error handling
   */
  async clearLocalStorage() {
    try {
      // Navigate to a safe page first to ensure we have proper context
      await this.page.goto('about:blank');
      await this.page.waitForLoadState('domcontentloaded');

      await this.page.evaluate(() => {
        try {
          if (typeof localStorage !== 'undefined' && localStorage) {
            localStorage.clear();
          }
        } catch (error) {
          // Ignore localStorage errors
          console.warn('localStorage clear failed:', error);
        }
      });
    } catch (error) {
      // Ignore localStorage errors in test environment
      console.warn('localStorage clear failed:', error);
    }
  }

  /**
   * Get localStorage data
   */
  async getLocalStorageData() {
    try {
      return await this.page.evaluate(() => {
        if (typeof localStorage !== 'undefined') {
          return {
            permitData: localStorage.getItem('permitData'),
            currentStep: localStorage.getItem('currentStep'),
          };
        }
        return null;
      });
    } catch (error) {
      console.warn('localStorage get failed:', error);
      return null;
    }
  }

  /**
   * Set localStorage data
   */
  async setLocalStorageData(data: Record<string, unknown>) {
    try {
      await this.page.evaluate(data => {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('permitData', JSON.stringify(data));
        }
      }, data);
    } catch (error) {
      console.warn('localStorage set failed:', error);
    }
  }

  /**
   * Take screenshot with timestamp
   */
  async takeScreenshot(name: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await this.page.screenshot({
      path: `test-results/${name}-${timestamp}.png`,
      fullPage: true,
    });
  }

  /**
   * Convert date from MM/DD/YYYY to YYYY-MM-DD format for HTML date inputs
   */
  private convertDateFormat(dateString: string): string {
    try {
      // Parse MM/DD/YYYY format
      const [month, day, year] = dateString.split('/');

      // Validate and fix invalid dates
      const validMonth = Math.max(1, Math.min(12, parseInt(month)));
      const validDay = Math.max(1, Math.min(31, parseInt(day)));
      const validYear = parseInt(year);

      // Ensure month and day are zero-padded
      const paddedMonth = validMonth.toString().padStart(2, '0');
      const paddedDay = validDay.toString().padStart(2, '0');

      // Return in YYYY-MM-DD format
      return `${validYear}-${paddedMonth}-${paddedDay}`;
    } catch {
      // Fallback to a valid date if parsing fails
      return '2000-01-01';
    }
  }

  /**
   * Wait for page to be ready with specific element checks
   */
  async waitForPageReady(testId: string) {
    await this.page.waitForSelector(`[data-testid="${testId}"]`, {
      state: 'visible',
      timeout: 30000,
    });
    // Small delay to ensure all components are rendered
    await this.page.waitForTimeout(500);
  }
}

// Export commonly used test data
export { aiGenerationTestData, completeTestData, validationTestData };
