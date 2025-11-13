import { test, expect } from './fixtures/pageFixtures';
import { TIMEOUTS } from './utils/constants';

// Run this test serially to avoid API overload during parallel execution
test.describe.configure({ mode: 'serial' });

test('view dish details', async ({ loginPage, dishesPage, dishViewPage, page }) => {
  // Login
  await loginPage.loginAsTestUser();
  
  // Wait for dishes to load
  await dishesPage.waitForPageLoad();
  
  // Click first "Ver" link
  await dishesPage.clickFirstView();
  
  // Wait for page to load
  await dishViewPage.waitForPageLoad();
  
  // Verify dish details are visible
  await dishViewPage.verifyAllDetailsVisible();
});
