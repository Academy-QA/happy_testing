import { test, expect } from './fixtures/pageFixtures';
import { TIMEOUTS } from './utils/constants';

test('delete dish and verify it disappears', async ({ loginPage, dishesPage, page }) => {
  // Login
  await loginPage.loginAsTestUser();
  
  // Wait for dishes to load
  await dishesPage.waitForPageLoad();
  
  // Count initial dishes
  const initialCount = await dishesPage.getDishCount();
  console.log(`Número inicial de platillos: ${initialCount}`);
  
  // Get the first dish name before deleting
  const dishName = await dishesPage.getFirstDishName();
  console.log(`Eliminando platillo: ${dishName}`);
  
  // Delete first dish
  await dishesPage.clickFirstDelete();
  
  // Wait for deletion to process
  await page.waitForTimeout(TIMEOUTS.SHORT * 2);
  
  // Count dishes after deletion
  const finalCount = await dishesPage.getDishCount();
  console.log(`Número final de platillos: ${finalCount}`);
  
  // Verify at least one dish was removed
  expect(finalCount).toBeLessThan(initialCount);
  
  console.log(`✓ Platillo eliminado exitosamente`);
});
