import { test, expect } from './fixtures/pageFixtures';

test('user registration and redirect to login', async ({ registerPage }) => {
  // Navigate to register page
  await registerPage.goto();
  await registerPage.verifyOnRegisterPage();
  
  // Fill registration form with test data
  await registerPage.fillWithTestData();
  
  // Submit form
  await registerPage.submit();
  
  // Verify redirect to login
  await registerPage.waitForRedirectToLogin();
});
