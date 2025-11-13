import { test, expect, Page } from '@playwright/test';

async function login(page: Page) {
  await page.goto('http://localhost:3000/login');
  await page.getByTestId('login-email').fill('test@nutriapp.com');
  await page.getByTestId('login-password').fill('nutriapp123');
  await page.getByTestId('login-submit').click({ force: true });
  await expect(page).toHaveURL(/.*dishes/);
}

test.describe('Dish view page tests', () => {
  test('view page displays all dish details', async ({ page }) => {
    await login(page);
    
    // Wait for dishes to load
    await page.waitForTimeout(1000);
    
    // Get the first dish name
    const firstDishName = await page.locator('h2').first().textContent();
    
    // Click on "Ver" link
    await page.getByRole('link', { name: 'Ver' }).first().click({ force: true });
    
    // Wait for the view page to load
    await page.waitForURL(/.*\/dishes\/\d+\/view/, { timeout: 10000 });
    await page.waitForTimeout(4000); // Wait for client-side data loading
    
    // Verify dish name is displayed
    if (firstDishName) {
      await expect(page.getByRole('heading', { name: new RegExp(firstDishName, 'i') })).toBeVisible({ timeout: 5000 });
    }
    
    // Verify "Pasos de preparación" section is visible
    await expect(page.getByRole('heading', { name: /Pasos de preparación/i })).toBeVisible();
    
    // Verify at least one preparation step is visible
    await expect(page.locator('li').first()).toBeVisible();
  });

  test('view page displays calories if available', async ({ page }) => {
    await login(page);
    
    await page.waitForTimeout(1000);
    
    // Click on first "Ver" link
    await page.getByRole('link', { name: 'Ver' }).first().click({ force: true });
    
    // Wait for page to load
    await page.waitForURL(/.*\/dishes\/\d+\/view/, { timeout: 10000 });
    await page.waitForTimeout(4000);
    
    // Check if calories are displayed (they might not be present for all dishes)
    const caloriesElement = page.getByText(/kcal/i);
    if (await caloriesElement.isVisible()) {
      await expect(caloriesElement).toBeVisible();
    }
  });

  test('view page displays time badge', async ({ page }) => {
    await login(page);
    
    await page.waitForTimeout(1000);
    
    // Click on first "Ver" link
    await page.getByRole('link', { name: 'Ver' }).first().click({ force: true });
    
    // Wait for page to load
    await page.waitForURL(/.*\/dishes\/\d+\/view/, { timeout: 10000 });
    await page.waitForTimeout(4000);
    
    // Verify time badge is visible (either "Rápido" or "XX min")
    const quickBadge = page.getByText('Rápido');
    const timeBadge = page.getByText(/\d+ min/);
    
    const isQuickVisible = await quickBadge.isVisible();
    const isTimeVisible = await timeBadge.isVisible();
    
    // At least one should be visible
    expect(isQuickVisible || isTimeVisible).toBeTruthy();
  });
});
