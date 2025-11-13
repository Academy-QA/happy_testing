import { Page, Locator, expect } from '@playwright/test';
import { URLS, TIMEOUTS } from '../utils/constants';

/**
 * Page Object Model for Dish View Page
 * Centralizes all selectors and actions for viewing dish details
 */
export class DishViewPage {
  readonly page: Page;
  
  // Selectors
  readonly dishName: Locator;
  readonly dishDescription: Locator;
  readonly preparationStepsHeading: Locator;
  readonly preparationSteps: Locator;
  readonly caloriesBadge: Locator;
  readonly timeBadge: Locator;
  readonly quickBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.dishName = page.locator('h2').first();
    this.dishDescription = page.locator('p').first();
    this.preparationStepsHeading = page.getByRole('heading', { name: /Pasos de preparación/i });
    this.preparationSteps = page.locator('li');
    this.caloriesBadge = page.getByText(/kcal/i);
    this.timeBadge = page.getByText(/\d+ min/);
    this.quickBadge = page.getByText('Rápido');
  }

  /**
   * Navigate to dish view page
   */
  async goto(dishId: number) {
    await this.page.goto(URLS.DISH_VIEW(dishId));
  }

  /**
   * Wait for page to load with client-side data
   */
  async waitForPageLoad() {
    await this.page.waitForURL(/.*\/dishes\/\d+\/view/, { timeout: TIMEOUTS.LONG });
    await this.page.waitForTimeout(TIMEOUTS.CLIENT_SIDE_DATA);
  }

  /**
   * Verify dish name is visible
   */
  async verifyDishNameVisible(expectedName?: string) {
    await expect(this.dishName).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    
    if (expectedName) {
      await expect(this.dishName).toHaveText(new RegExp(expectedName, 'i'));
    }
  }

  /**
   * Verify preparation steps section is visible
   */
  async verifyPreparationStepsVisible() {
    await expect(this.preparationStepsHeading).toBeVisible();
    await expect(this.preparationSteps.first()).toBeVisible();
  }

  /**
   * Verify calories badge is visible
   */
  async verifyCaloriesVisible(): Promise<boolean> {
    return await this.caloriesBadge.isVisible();
  }

  /**
   * Verify time badge is visible (either quick or minutes)
   */
  async verifyTimeBadgeVisible(): Promise<boolean> {
    const isQuickVisible = await this.quickBadge.isVisible();
    const isTimeVisible = await this.timeBadge.isVisible();
    return isQuickVisible || isTimeVisible;
  }

  /**
   * Verify all dish details are displayed
   */
  async verifyAllDetailsVisible() {
    await this.verifyDishNameVisible();
    await this.verifyPreparationStepsVisible();
  }
}
