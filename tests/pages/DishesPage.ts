import { Page, Locator, expect } from '@playwright/test';
import { URLS, TEST_DATA, TIMEOUTS } from '../utils/constants';

/**
 * Page Object Model for Dishes List Page
 * Centralizes all selectors and actions for the dishes list page
 */
export class DishesPage {
  readonly page: Page;
  
  // Selectors
  readonly pageHeading: Locator;
  readonly addDishLink: Locator;
  readonly dishCards: Locator;
  readonly dishNames: Locator;
  readonly editLinks: Locator;
  readonly viewLinks: Locator;
  readonly deleteButtons: Locator;
  readonly navbarRecetasLink: Locator;
  readonly navbarLogoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.pageHeading = page.getByRole('heading', { name: /Sugerencias de Platillos/i });
    this.addDishLink = page.getByRole('link', { name: '+ Agregar Platillo' });
    this.dishCards = page.locator('article, .dish-card');
    this.dishNames = page.locator('h2');
    this.editLinks = page.getByRole('link', { name: 'Editar' });
    this.viewLinks = page.getByRole('link', { name: 'Ver' });
    this.deleteButtons = page.getByRole('button', { name: 'Eliminar' });
    
    // Navbar elements
    this.navbarRecetasLink = page.getByRole('link', { name: /Recetas/i });
    this.navbarLogoutButton = page.getByRole('button', { name: /Logout/i });
  }

  /**
   * Navigate to dishes page
   */
  async goto() {
    await this.page.goto(URLS.DISHES);
  }

  /**
   * Wait for page to load
   */
  async waitForPageLoad() {
    await expect(this.pageHeading).toBeVisible({ timeout: TIMEOUTS.LONG });
    await this.page.waitForTimeout(TIMEOUTS.SHORT);
  }

  /**
   * Verify we're on dishes page
   */
  async verifyOnDishesPage() {
    await expect(this.page).toHaveURL(/.*dishes/);
    await expect(this.pageHeading).toBeVisible();
  }

  /**
   * Get count of dishes on page
   */
  async getDishCount(): Promise<number> {
    return await this.dishNames.count();
  }

  /**
   * Get first dish name
   */
  async getFirstDishName(): Promise<string | null> {
    return await this.dishNames.first().textContent();
  }

  /**
   * Click add dish button
   */
  async clickAddDish() {
    await this.addDishLink.click({ force: true });
  }

  /**
   * Click first edit link
   */
  async clickFirstEdit() {
    await this.editLinks.first().click({ force: true });
  }

  /**
   * Click first view link
   */
  async clickFirstView() {
    await this.viewLinks.first().click({ force: true });
  }

  /**
   * Click first delete button
   */
  async clickFirstDelete() {
    await this.deleteButtons.first().click({ force: true });
  }

  /**
   * Verify dish with name is visible
   */
  async verifyDishVisible(dishName: string) {
    await expect(this.page.getByText(dishName).first()).toBeVisible({ 
      timeout: TIMEOUTS.LONG 
    });
  }

  /**
   * Logout from application
   */
  async logout() {
    await this.navbarLogoutButton.click();
  }

  /**
   * Verify navbar is visible
   */
  async verifyNavbarVisible() {
    await expect(this.navbarRecetasLink).toBeVisible();
    await expect(this.navbarLogoutButton).toBeVisible();
  }

  /**
   * Click on Recetas link in navbar
   */
  async clickRecetasLink() {
    await this.navbarRecetasLink.click();
  }
}
