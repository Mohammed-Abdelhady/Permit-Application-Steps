# E2E Testing with Video Recording and Screenshots

This document explains how to run the complete permit application flow E2E test with comprehensive video recording and screenshots.

## 🎥 Video Recording Features

The complete flow test includes enhanced video recording with:

- **High-quality video** (1280x720 resolution)
- **Slow-motion actions** (100ms delay between actions for better visibility)
- **Retain on failure** (videos are kept even if tests fail)
- **Full test coverage** (entire user journey recorded)

## 📸 Screenshot Documentation

The test automatically captures screenshots at key points:

### Screenshot Sequence:

1. `01-personal-information-initial.png` - Initial personal information page
2. `02-personal-information-filled.png` - Personal information form filled
3. `03-family-financial-initial.png` - Family financial page initial state
4. `04-family-financial-filled.png` - Family financial form filled
5. `05-situation-description-initial.png` - Situation description page initial
6. `06-situation-description-filled.png` - Situation description form filled
7. `07-success-page-header.png` - Success page header section
8. `08-complete-success-page.png` - Complete success page view
9. `09-application-summary.png` - Application summary section
10. `10-application-analysis.png` - Application analysis section

## 🚀 Running the Complete Flow Test

### Basic Video Recording

```bash
# Run complete flow test with video recording
npm run test:e2e:complete-flow
```

### Headed Mode (See Browser)

```bash
# Run with visible browser window
npm run test:e2e:complete-flow:headed
```

### UI Mode (Interactive)

```bash
# Run with Playwright UI for debugging
npm run test:e2e:complete-flow:ui
```

## 📁 Output Locations

### Videos

- **Location**: `test-results/` directory
- **Format**: `.webm` files
- **Naming**: `complete-permit-flow-success-chromium-[timestamp].webm`

### Screenshots

- **Location**: `test-results/` directory
- **Format**: `.png` files
- **Naming**: Sequential numbering (01-10) with descriptive names

### Test Reports

- **HTML Report**: `playwright-report/index.html`
- **JSON Results**: `test-results/results.json`
- **JUnit XML**: `test-results/results.xml`

## 🎯 Test Coverage

The complete flow test verifies:

### ✅ Form Validation

- Required field validation
- Data format validation
- Form submission validation

### ✅ Data Persistence

- Form data survives navigation
- Data persistence across steps
- State management verification

### ✅ Success Page Verification

- Application ID generation
- Submission date display
- Complete data summary
- AI analysis generation

### ✅ User Experience

- Progress indicator updates
- Loading states
- Error handling
- Responsive design

## 🔧 Configuration Details

### Video Settings

```typescript
video: {
  mode: 'retain-on-failure',
  size: { width: 1280, height: 720 },
}
```

### Screenshot Settings

```typescript
screenshot: 'only-on-failure';
```

### Performance Settings

```typescript
launchOptions: {
  slowMo: 100, // 100ms delay between actions
}
```

## 📊 Test Data

The test uses comprehensive, realistic data:

### Personal Information

- Name: Mohammed Abdelhady
- Nationality: Saudi Arabia (SA)
- Email: ahmed.alrashid@example.com
- Phone: +966501234567

### Family Financial

- Monthly Income: 15,000 SAR
- Family Size: 4 members
- Spouse Income: 8,000 SAR
- Children: 2
- Monthly Expenses: 6,000 SAR
- Savings: 50,000 SAR

### Situation Description

- Career-focused application reason
- Current software engineering position
- Future technology consulting goals
- Complete emergency contact information

## 🎬 Video Quality Tips

1. **Run in headed mode** for best visual quality
2. **Use single worker** to avoid parallel execution issues
3. **Ensure stable network** for consistent API responses
4. **Close other applications** to improve performance

## 📝 Troubleshooting

### Video Not Recording

- Check Playwright configuration
- Verify output directory permissions
- Ensure sufficient disk space

### Screenshots Missing

- Check test-results directory exists
- Verify test data IDs are correct
- Ensure page elements are visible

### Test Failures

- Check API endpoints are running
- Verify environment variables
- Review browser console for errors

## 🎯 Best Practices

1. **Run tests in clean environment**
2. **Use consistent test data**
3. **Review videos for UX improvements**
4. **Document any test failures**
5. **Keep test data realistic and comprehensive**
