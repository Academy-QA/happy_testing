import { test, expect } from './fixtures/pageFixtures';
import { TIMEOUTS } from './utils/constants';

// Run this test serially to avoid API overload during parallel execution
test.describe.configure({ mode: 'serial' });

test('edit dish and save changes', async ({ loginPage, dishesPage, dishFormPage, page }) => {
  // Login
  await loginPage.loginAsTestUser();
  
  // Wait for dishes to load
  await dishesPage.waitForPageLoad();
  
  // Click first edit link
  await dishesPage.clickFirstEdit();
  
  // Wait for navigation to edit page
  await page.waitForURL(/.*\/dishes\/\d+$/, { timeout: TIMEOUTS.LONG });
  
  // Wait for form data to load
  await dishFormPage.waitForDataLoad();
  
  // Update dish name
  await dishFormPage.updateName('Platillo Editado E2E');
  
  // Submit form
  await dishFormPage.submit();
  
  // Verify redirect and updated dish
  await dishFormPage.waitForRedirectToDishes();
  await dishesPage.verifyDishVisible('Platillo Editado E2E');
});
