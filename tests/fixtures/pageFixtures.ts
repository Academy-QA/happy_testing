import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DishesPage } from '../pages/DishesPage';
import { DishFormPage } from '../pages/DishFormPage';
import { DishViewPage } from '../pages/DishViewPage';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from '../pages/HomePage';

/**
 * Extended test fixtures with Page Objects
 * Makes all page objects available in every test via destructuring
 * 
 * Usage in tests:
 * test('my test', async ({ loginPage, dishesPage }) => {
 *   await loginPage.loginAsTestUser();
 *   await dishesPage.verifyOnDishesPage();
 * });
 */

type PageFixtures = {
  loginPage: LoginPage;
  dishesPage: DishesPage;
  dishFormPage: DishFormPage;
  dishViewPage: DishViewPage;
  registerPage: RegisterPage;
  homePage: HomePage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  
  dishesPage: async ({ page }, use) => {
    await use(new DishesPage(page));
  },
  
  dishFormPage: async ({ page }, use) => {
    await use(new DishFormPage(page));
  },
  
  dishViewPage: async ({ page }, use) => {
    await use(new DishViewPage(page));
  },
  
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect } from '@playwright/test';
