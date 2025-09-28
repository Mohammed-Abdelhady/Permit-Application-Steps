import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/scenarios',
  fullyParallel: false, // Ensure tests run sequentially for consistent video
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Only one worker for consistent video recording
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'on', // Always take screenshots
    video: {
      mode: 'on', // Always record video for individual scenarios
      size: { width: 1280, height: 720 },
    },
    launchOptions: {
      slowMo: 150, // 150ms delay between actions for better video visibility
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
