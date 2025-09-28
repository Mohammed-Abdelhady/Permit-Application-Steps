# 🎬 E2E Testing Guide - Complete Flow Videos

This guide explains how to run individual E2E test scenarios with full flow video recording.

## 🎥 Individual Scenario Testing

Each scenario can be run individually with enhanced video recording:

### Scenario 1: Complete Flow Without AI Generation

```bash
npm run test:e2e:scenario1
```

**What it tests:**

- Complete permit application flow
- Auto-fill all forms
- Navigation between steps
- Success page verification
- Form data persistence

### Scenario 2: Complete Flow With AI Generation

```bash
npm run test:e2e:scenario2
```

**What it tests:**

- Complete permit application flow
- AI-powered text generation
- AI suggestion popup interactions
- Performance and loading states
- AI-generated content verification

### Scenario 3: Form Validation with Auto-Fix

```bash
npm run test:e2e:scenario3
```

**What it tests:**

- Invalid data submission
- Real-time validation feedback
- Auto-fix functionality
- Error message display
- Form correction mechanisms

### Scenario 4: Success Screen with Wrong ID

```bash
npm run test:e2e:scenario4
```

**What it tests:**

- Invalid application IDs in URL
- Malformed URLs
- Error handling and recovery
- Security against injection attempts
- Case sensitivity handling

### Scenario 5: Refresh Warning and Navigation

```bash
npm run test:e2e:scenario5
```

**What it tests:**

- Browser refresh warnings
- Navigation away warnings
- Form data protection
- Multiple browser actions
- Warning dialog interactions

### Scenario 6: LocalStorage Persistence

```bash
npm run test:e2e:scenario6
```

**What it tests:**

- Data persistence after refresh
- Cross-step data retention
- Browser close/reopen scenarios
- Partial data handling
- AI-generated content persistence

## 🎬 Video Recording Features

Each individual scenario includes:

- **High-quality video** (1280x720 resolution)
- **Slow-motion actions** (150ms delay for better visibility)
- **Full test coverage** (entire user journey recorded)
- **Automatic screenshots** at key points
- **Detailed test reports** with video links

## 📁 Output Locations

### Videos

- **Location**: `test-results/scenarios-XX-[test-name]-[browser]/video.webm`
- **Format**: WebM video format
- **Quality**: 1280x720 resolution

### Screenshots

- **Location**: `test-results/scenarios-XX-[test-name]-[browser]/test-finished-1.png`
- **Format**: PNG images
- **Coverage**: Key test moments

### Reports

- **Location**: `playwright-report/index.html`
- **Access**: Run `npm run test:e2e:report` to view

## 🚀 Quick Start

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Run any individual scenario:**

   ```bash
   npm run test:e2e:scenario1  # Complete flow without AI
   npm run test:e2e:scenario2  # Complete flow with AI
   npm run test:e2e:scenario3  # Form validation
   npm run test:e2e:scenario4  # Error handling
   npm run test:e2e:scenario5  # Navigation warnings
   npm run test:e2e:scenario6  # Data persistence
   ```

3. **View the results:**
   ```bash
   npm run test:e2e:report
   ```

## 🔧 Configuration Details

### Individual Scenario Config (`playwright-scenario.config.ts`)

- **Video**: Always on with high quality
- **Screenshots**: Always taken
- **Slow motion**: 150ms delay between actions
- **Workers**: Single worker for consistent recording
- **Parallel**: Disabled for sequential execution

### Test Data

- **Centralized**: All test data in `e2e/common/testData.ts`
- **Reusable**: Common data sets for different scenarios
- **Consistent**: Same data across all tests

### Helper Functions

- **FormHelper**: Common form interactions
- **Screenshot**: Automatic screenshot capture
- **Verification**: Data validation helpers
- **Navigation**: Step-by-step navigation

## 🎯 Test Coverage

Each scenario covers:

1. **User Interface**: Form interactions, navigation, UI elements
2. **Data Flow**: Form submission, validation, persistence
3. **Error Handling**: Invalid inputs, network errors, edge cases
4. **Accessibility**: Keyboard navigation, screen reader support
5. **Performance**: Loading states, response times, AI generation
6. **Security**: Input validation, XSS prevention, data protection

## 📊 Scenario Summary

| Scenario | Focus                   | Duration | Video Size |
| -------- | ----------------------- | -------- | ---------- |
| 1        | Complete Flow (No AI)   | ~3-5 min | ~50-80 MB  |
| 2        | Complete Flow (With AI) | ~5-8 min | ~80-120 MB |
| 3        | Form Validation         | ~4-6 min | ~60-90 MB  |
| 4        | Error Handling          | ~3-5 min | ~50-80 MB  |
| 5        | Navigation Warnings     | ~4-6 min | ~60-90 MB  |
| 6        | Data Persistence        | ~5-7 min | ~70-100 MB |

## 🛠️ Troubleshooting

### Common Issues

1. **localStorage Errors**: Fixed with try-catch blocks
2. **Video Recording**: Ensure sufficient disk space
3. **Test Timeouts**: Increase timeout in config if needed
4. **Browser Issues**: Try different browsers (Chrome, Firefox, Safari)

### Performance Tips

1. **Close other applications** during video recording
2. **Use SSD storage** for better video performance
3. **Run scenarios individually** for better resource management
4. **Check disk space** before running tests

## 🎥 Video Quality Settings

- **Resolution**: 1280x720 (HD)
- **Frame Rate**: 30 FPS
- **Codec**: VP8 (WebM)
- **Bitrate**: Adaptive
- **Audio**: Disabled (for smaller file size)

## 📈 Best Practices

1. **Run scenarios individually** for focused testing
2. **Review videos** to identify UI/UX issues
3. **Use screenshots** for quick verification
4. **Check reports** for detailed test results
5. **Clean up old videos** regularly to save space

## 🔍 Debugging

### Enable Debug Mode

```bash
# Run with debug information
npm run test:e2e:scenario1 -- --debug

# Run with trace
npm run test:e2e:scenario1 -- --trace on
```

### View Test Results

```bash
# Open HTML report
npm run test:e2e:report

# View specific test results
npx playwright show-report
```

## 🎯 Next Steps

1. **Run individual scenarios** to see complete flows
2. **Review video recordings** for UI/UX insights
3. **Check test reports** for detailed results
4. **Modify test data** in `testData.ts` as needed
5. **Add new scenarios** following the existing pattern

---

**Happy Testing! 🎬✨**
