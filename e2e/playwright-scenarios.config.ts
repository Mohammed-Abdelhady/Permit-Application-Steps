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
      mode: 'retain-on-failure', // 'on', 'off', 'retain-on-failure', 'on-first-retry'
      size: { width: 1280, height: 720 },
    },
    launchOptions: {
      slowMo: 100, // 100ms delay between actions for better video visibility
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
