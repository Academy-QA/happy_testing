import { test, expect } from '@playwright/test';

// Test: Login page loads and allows login
// You may need to adjust credentials to match a test user in your DB

test('login page loads and allows login', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await expect(page.getByRole('heading', { name: /Bienvenido/i })).toBeVisible();
  await page.getByTestId('login-email').fill('test@nutriapp.com');
  await page.getByTestId('login-password').fill('nutriapp123');
  await page.getByTestId('login-submit').click({ force: true });
  await expect(page).toHaveURL(/.*dishes/);
});

// Test: Register page loads and allows registration

test('register page loads and allows registration', async ({ page }) => {
  await page.goto('http://localhost:3000/register');
  await expect(page.getByRole('heading', { name: /Crear cuenta/i })).toBeVisible();
  await page.getByTestId('register-firstName').fill('Test');
  await page.getByTestId('register-lastName').fill('User');
  await page.getByTestId('register-email').fill('testuser'+Date.now()+'@correo.com');
  await page.getByTestId('register-nationality').fill('MX');
  await page.getByTestId('register-phone').fill('1234567890');
  await page.getByTestId('register-password').fill('nutriapp123');
  await page.getByRole('button', { name: /Registrarse|Crear cuenta/i }).click({ force: true });
  await expect(page).toHaveURL(/.*login/);
});

// Test: Dishes page loads and shows title

test('dishes page loads and shows title', async ({ page }) => {
  // Login first
  await page.goto('http://localhost:3000/login');
  await page.getByTestId('login-email').fill('test@nutriapp.com');
  await page.getByTestId('login-password').fill('nutriapp123');
  await page.getByTestId('login-submit').click({ force: true });
  await expect(page).toHaveURL(/.*dishes/, { timeout: 10000 });
  await expect(page.getByRole('heading', { name: /Sugerencias de Platillos/i })).toBeVisible({ timeout: 10000 });
});

// Test: New dish form loads

test('new dish form loads', async ({ page }) => {
  // Login first
  await page.goto('http://localhost:3000/login');
  await page.getByTestId('login-email').fill('test@nutriapp.com');
  await page.getByTestId('login-password').fill('nutriapp123');
  await page.getByTestId('login-submit').click({ force: true });
  await expect(page).toHaveURL(/.*dishes/);
  await page.goto('http://localhost:3000/dishes/new');
  await expect(page.getByRole('heading', { name: /Agregar Platillo/i })).toBeVisible();
});
