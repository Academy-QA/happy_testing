import { test, expect } from './fixtures/pageFixtures';
import { TIMEOUTS } from './utils/constants';

test.describe('Login error handling', () => {
  test('shows error message with incorrect credentials', async ({ loginPage, page }) => {
    // Navigate to login
    await loginPage.goto();
    
    // Fill with wrong credentials
    await loginPage.login('wrong@email.com', 'wrongpassword');
    
    // Wait for error message
    await page.waitForTimeout(TIMEOUTS.SHORT);
    
    // Verify error message appears
    await loginPage.verifyErrorMessage();
    
    // Verify still on login page
    await loginPage.verifyOnLoginPage();
  });

  test('does not allow login with empty fields', async ({ loginPage }) => {
    // Navigate to login
    await loginPage.goto();
    
    // Try to submit empty form
    await loginPage.submit();
    
    // Verify still on login page (form validation prevents submission)
    await loginPage.verifyOnLoginPage();
  });

  test('navigates to register page from login', async ({ loginPage, registerPage }) => {
    // Navigate to login
    await loginPage.goto();
    
    // Click on register link
    await loginPage.goToRegister();
    
    // Verify on register page
    await registerPage.verifyOnRegisterPage();
  });
});
