import { test, expect } from '@playwright/test';

test.describe('Register page navigation', () => {
  test('navigates to login page from register', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    
    // Click on "Inicia sesión" link
    await page.getByRole('link', { name: /Inicia sesión/i }).click();
    
    // Verify navigation to login page
    await expect(page).toHaveURL(/.*login/);
    await expect(page.getByRole('heading', { name: /Bienvenido/i })).toBeVisible();
  });

  test('register form requires all fields', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    
    // Try to submit empty form
    await page.getByRole('button', { name: /Registrarse/i }).click({ force: true });
    
    // Verify we're still on register page (form validation prevents submission)
    await expect(page).toHaveURL(/.*register/);
    await expect(page.getByRole('heading', { name: /Crear cuenta/i })).toBeVisible();
  });

  test('register form displays all required fields', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    
    // Verify all required fields are visible
    await expect(page.getByTestId('register-firstName')).toBeVisible();
    await expect(page.getByTestId('register-lastName')).toBeVisible();
    await expect(page.getByTestId('register-email')).toBeVisible();
    await expect(page.getByTestId('register-nationality')).toBeVisible();
    await expect(page.getByTestId('register-phone')).toBeVisible();
    await expect(page.getByTestId('register-password')).toBeVisible();
    
    // Verify submit button is visible
    await expect(page.getByRole('button', { name: /Registrarse/i })).toBeVisible();
  });
});
