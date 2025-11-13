import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Reduce workers to avoid API overload on client-side data fetching tests
  workers: 1,
  
  // Retry failed tests once to handle intermittent API issues
  retries: 1,
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    port: 3000,
    timeout: 120,
    reuseExistingServer: true,
  },
});
