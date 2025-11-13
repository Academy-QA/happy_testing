import { test, expect } from './fixtures/pageFixtures';
import { TEST_DATA } from './utils/constants';

test('add new dish and verify it appears', async ({ loginPage, dishesPage, dishFormPage }) => {
  // Login
  await loginPage.loginAsTestUser();
  
  // Wait for page to stabilize
  await dishesPage.waitForPageLoad();
  
  // Go to add dish form
  await dishesPage.clickAddDish();
  await dishFormPage.verifyFormVisible();
  
  // Generate unique dish name
  const timestamp = Date.now();
  const dishName = `${TEST_DATA.DISH.NAME_PREFIX} ${timestamp}`;
  
  // Fill and submit form
  await dishFormPage.fillWithTestData(dishName);
  await dishFormPage.submit();
  
  // Wait for redirect and verify dish appears
  await dishFormPage.waitForRedirectToDishes();
  await dishesPage.verifyDishVisible(dishName);
  
  console.log(`✓ Platillo creado exitosamente: ${dishName}`);
});
