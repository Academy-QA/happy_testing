import { test, expect, Page } from '@playwright/test';

async function login(page: Page) {
  await page.goto('http://localhost:3000/login');
  await page.getByTestId('login-email').fill('test@nutriapp.com');
  await page.getByTestId('login-password').fill('nutriapp123');
  await page.getByTestId('login-submit').click({ force: true });
  await page.waitForURL(/.*dishes/, { timeout: 30000 });
}

test.describe('Cleanup tests', () => {
  // Skip this test by default - run manually with: npx playwright test cleanup_e2e
  test.skip('clean up duplicate test dishes', async ({ page }) => {
    await login(page);
    
    // Wait for dishes to load
    await page.waitForTimeout(2000);
    
    // Find all "Platillo Playwright" dishes and delete them except one
    let deletedCount = 0;
    const maxDeletions = 10; // Safety limit
    
    while (deletedCount < maxDeletions) {
      // Check if there are multiple "Platillo Playwright" dishes
      const playwrightDishes = await page.getByText('Platillo Playwright').count();
      
      if (playwrightDishes <= 1) {
        console.log(`Solo queda ${playwrightDishes} "Platillo Playwright", deteniendo limpieza.`);
        break;
      }
      
      // Find and click the first delete button for "Platillo Playwright"
      const deleteButtons = page.getByRole('button', { name: 'Eliminar' });
      const firstDeleteButton = deleteButtons.first();
      
      if (await firstDeleteButton.isVisible()) {
        await firstDeleteButton.click({ force: true });
        deletedCount++;
        console.log(`Eliminado platillo ${deletedCount}`);
        
        // Wait for deletion to complete
        await page.waitForTimeout(1000);
        
        // Reload to get fresh data
        await page.reload();
        await page.waitForTimeout(1000);
      } else {
        break;
      }
    }
    
    console.log(`Total de platillos eliminados: ${deletedCount}`);
    
    // Verify we still have dishes on the page
    await expect(page.getByRole('heading', { name: /Sugerencias de Platillos/i })).toBeVisible();
  });
});
