import { test, expect } from './fixtures/pageFixtures';

test('successful login and logout', async ({ loginPage, dishesPage }) => {
  // Login using Page Object
  await loginPage.loginAsTestUser();
  
  // Verify we're on dishes page
  await dishesPage.verifyOnDishesPage();
  
  // Logout
  await dishesPage.logout();
  
  // Verify redirect to login
  await loginPage.verifyOnLoginPage();
});
