import { test, expect } from './fixtures/pageFixtures';

test.describe('Navbar navigation tests', () => {
  test('"Recetas" link in navbar navigates to dishes page', async ({ loginPage, dishesPage }) => {
    // Login
    await loginPage.loginAsTestUser();
    
    // Click on "Recetas" link
    await dishesPage.clickRecetasLink();
    
    // Verify we're on dishes page
    await dishesPage.verifyOnDishesPage();
  });

  test('navbar remains visible on all authenticated pages', async ({ loginPage, dishesPage, dishFormPage }) => {
    // Login
    await loginPage.loginAsTestUser();
    
    // Verify navbar on dishes page
    await dishesPage.verifyNavbarVisible();
    
    // Navigate to new dish page
    await dishFormPage.gotoNew();
    
    // Verify navbar still visible
    await dishesPage.verifyNavbarVisible();
  });
});
