import { test, expect } from './fixtures/pageFixtures';

test.describe('Homepage tests', () => {
  test('homepage shows test credentials', async ({ homePage }) => {
    // Navigate to homepage
    await homePage.goto();
    
    // Verify welcome message
    await homePage.verifyWelcomeMessage();
    
    // Verify test credentials are displayed
    await homePage.verifyCredentialsVisible();
    
    // Verify "Go to Login" link exists
    await homePage.verifyLoginLinkVisible();
  });

  test('homepage "Go to Login" link navigates to login page', async ({ homePage, loginPage }) => {
    // Navigate to homepage
    await homePage.goto();
    
    // Click login link
    await homePage.goToLogin();
    
    // Verify on login page
    await loginPage.verifyOnLoginPage();
  });
});
