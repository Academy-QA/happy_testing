import { Page, Locator, expect } from '@playwright/test';
import { URLS, TEST_DATA, TIMEOUTS } from '../utils/constants';

/**
 * Page Object Model for Dish Form (New/Edit)
 * Centralizes all selectors and actions for dish creation and editing
 */
export class DishFormPage {
  readonly page: Page;
  
  // Form field selectors
  readonly nameInput: Locator;
  readonly descriptionInput: Locator;
  readonly prepTimeInput: Locator;
  readonly cookTimeInput: Locator;
  readonly caloriesInput: Locator;
  readonly imageUrlInput: Locator;
  readonly quickPrepCheckbox: Locator;
  
  // Step management
  readonly stepInputs: Locator;
  readonly addStepButton: Locator;
  readonly removeStepButtons: Locator;
  
  // Form actions
  readonly saveButton: Locator;
  readonly pageHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Using data-testid for form fields
    // For edit form, use edit-* prefixed test IDs, otherwise use dish-* prefixed ones
    this.nameInput = page.locator('[data-testid="dish-name"], [data-testid="edit-dish-name"]');
    this.descriptionInput = page.locator('[data-testid="dish-description"], [data-testid="edit-dish-description"]');
    this.prepTimeInput = page.locator('[data-testid="dish-prepTime"], [data-testid="edit-dish-prepTime"]');
    this.cookTimeInput = page.getByTestId('dish-cookTime');
    this.caloriesInput = page.locator('[data-testid="dish-calories"], [data-testid="edit-dish-calories"]');
    this.imageUrlInput = page.getByTestId('dish-imageUrl');
    
    this.quickPrepCheckbox = page.getByRole('checkbox', { name: /Preparación rápida/i });
    this.addStepButton = page.getByRole('button', { name: /\+ Agregar paso/i });
    this.removeStepButtons = page.getByRole('button', { name: '×' });
    this.saveButton = page.getByRole('button', { name: /Guardar/i });
    this.pageHeading = page.getByRole('heading', { name: /Agregar Platillo|Editar Platillo/i });
    this.stepInputs = page.locator('input[placeholder^="Paso"]');
  }

  /**
   * Navigate to new dish page
   */
  async gotoNew() {
    await this.page.goto(URLS.NEW_DISH);
  }

  /**
   * Navigate to edit dish page
   */
  async gotoEdit(dishId: number) {
    await this.page.goto(URLS.DISH_EDIT(dishId));
  }

  /**
   * Fill step input by index (1-based)
   */
  getStepInput(stepNumber: number): Locator {
    return this.page.getByPlaceholder(`Paso ${stepNumber}`);
  }

  /**
   * Fill all required fields for a new dish
   */
  async fillDishForm(data: {
    name: string;
    description?: string;
    prepTime?: string;
    cookTime?: string;
    calories?: string;
    imageUrl?: string;
    steps?: string[];
  }) {
    await this.nameInput.fill(data.name);
    
    if (data.description) {
      await this.descriptionInput.fill(data.description);
    }
    
    if (data.prepTime) {
      await this.prepTimeInput.fill(data.prepTime);
    }
    
    if (data.cookTime) {
      await this.cookTimeInput.fill(data.cookTime);
    }
    
    if (data.calories) {
      await this.caloriesInput.fill(data.calories);
    }
    
    if (data.imageUrl) {
      await this.imageUrlInput.fill(data.imageUrl);
    }
    
    if (data.steps && data.steps.length > 0) {
      // Fill first step
      await this.getStepInput(1).fill(data.steps[0]);
      
      // Add and fill additional steps
      for (let i = 1; i < data.steps.length; i++) {
        await this.addStepButton.click();
        await this.getStepInput(i + 1).fill(data.steps[i]);
      }
    }
  }

  /**
   * Fill form with default test data
   */
  async fillWithTestData(dishName: string) {
    await this.fillDishForm({
      name: dishName,
      description: TEST_DATA.DISH.DESCRIPTION,
      prepTime: TEST_DATA.DISH.PREP_TIME,
      cookTime: TEST_DATA.DISH.COOK_TIME,
      calories: TEST_DATA.DISH.CALORIES,
      imageUrl: TEST_DATA.DISH.IMAGE_URL,
      steps: [TEST_DATA.DISH.STEP_1],
    });
  }

  /**
   * Add a preparation step
   */
  async addStep() {
    await this.addStepButton.click();
  }

  /**
   * Remove a step by index (0-based)
   */
  async removeStep(index: number) {
    await this.removeStepButtons.nth(index).click();
  }

  /**
   * Toggle quick preparation checkbox
   */
  async toggleQuickPrep() {
    await this.quickPrepCheckbox.click();
  }

  /**
   * Verify quick prep checkbox state
   */
  async verifyQuickPrepChecked(expected: boolean) {
    if (expected) {
      await expect(this.quickPrepCheckbox).toBeChecked();
    } else {
      await expect(this.quickPrepCheckbox).not.toBeChecked();
    }
  }

  /**
   * Get count of step inputs
   */
  async getStepCount(): Promise<number> {
    return await this.stepInputs.count();
  }

  /**
   * Submit the form
   */
  async submit() {
    await this.saveButton.click({ force: true });
  }

  /**
   * Wait for redirect to dishes page after save
   */
  async waitForRedirectToDishes() {
    await expect(this.page).toHaveURL(/.*\/dishes$/, { timeout: TIMEOUTS.LONG });
  }

  /**
   * Verify form heading is visible
   */
  async verifyFormVisible() {
    await expect(this.pageHeading).toBeVisible();
  }

  /**
   * Clear and update name field (for edit)
   */
  async updateName(newName: string) {
    await this.nameInput.clear();
    await this.nameInput.fill(newName);
  }

  /**
   * Wait for form data to load (for edit page with client-side fetch)
   */
  async waitForDataLoad() {
    await expect(this.nameInput).toBeVisible({ timeout: TIMEOUTS.EXTRA_LONG });
  }
}
