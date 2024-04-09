import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
dotenv.config({ path: '.env.local' });

/* See https://playwright.dev/docs/test-configuration */
export default defineConfig({
  globalSetup: require.resolve('./e2e/helpers/config/config-global-setup.ts'),
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.E2E_BASE_URL ?? 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
