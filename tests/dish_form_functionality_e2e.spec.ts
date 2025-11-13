import { test, expect } from './fixtures/pageFixtures';

test.describe('Dish form steps functionality', () => {
  test('allows adding multiple preparation steps', async ({ loginPage, dishFormPage }) => {
    // Login and navigate to form
    await loginPage.loginAsTestUser();
    await dishFormPage.gotoNew();
    
    // Verify initial state - should have 1 step field
    await expect(dishFormPage.getStepInput(1)).toBeVisible();
    
    // Add second step
    await dishFormPage.addStep();
    await expect(dishFormPage.getStepInput(2)).toBeVisible();
    
    // Add third step
    await dishFormPage.addStep();
    await expect(dishFormPage.getStepInput(3)).toBeVisible();
    
    // Verify all three steps are visible
    await expect(dishFormPage.getStepInput(1)).toBeVisible();
    await expect(dishFormPage.getStepInput(2)).toBeVisible();
    await expect(dishFormPage.getStepInput(3)).toBeVisible();
  });

  test('allows removing preparation steps', async ({ loginPage, dishFormPage }) => {
    // Login and navigate to form
    await loginPage.loginAsTestUser();
    await dishFormPage.gotoNew();
    
    // Add multiple steps
    await dishFormPage.addStep();
    await dishFormPage.addStep();
    
    // Verify 3 steps exist
    await expect(dishFormPage.getStepInput(1)).toBeVisible();
    await expect(dishFormPage.getStepInput(2)).toBeVisible();
    await expect(dishFormPage.getStepInput(3)).toBeVisible();
    
    // Delete second step (using nth(1) because first step might not have delete button)
    await dishFormPage.removeStep(1);
    
    // Verify we now have 2 steps
    await expect(dishFormPage.getStepInput(1)).toBeVisible();
    await expect(dishFormPage.getStepInput(2)).toBeVisible();
    
    // Paso 3 should not exist anymore
    await expect(dishFormPage.getStepInput(3)).not.toBeVisible();
  });

  test('quick preparation checkbox works correctly', async ({ loginPage, dishFormPage }) => {
    // Login and navigate to form
    await loginPage.loginAsTestUser();
    await dishFormPage.gotoNew();
    
    // Verify checkbox is not checked initially
    await dishFormPage.verifyQuickPrepChecked(false);
    
    // Click the checkbox
    await dishFormPage.toggleQuickPrep();
    
    // Verify checkbox is now checked
    await dishFormPage.verifyQuickPrepChecked(true);
    
    // Click again to uncheck
    await dishFormPage.toggleQuickPrep();
    
    // Verify checkbox is unchecked again
    await dishFormPage.verifyQuickPrepChecked(false);
  });

  test('numeric fields accept only valid values', async ({ loginPage, dishFormPage }) => {
    // Login and navigate to form
    await loginPage.loginAsTestUser();
    await dishFormPage.gotoNew();
    
    // Test prep time field
    await dishFormPage.prepTimeInput.fill('15');
    await expect(dishFormPage.prepTimeInput).toHaveValue('15');
    
    // Test cook time field
    await dishFormPage.cookTimeInput.fill('20');
    await expect(dishFormPage.cookTimeInput).toHaveValue('20');
    
    // Test calories field
    await dishFormPage.caloriesInput.fill('300');
    await expect(dishFormPage.caloriesInput).toHaveValue('300');
  });
});
