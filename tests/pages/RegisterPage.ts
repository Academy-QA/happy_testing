import { Page, Locator, expect } from '@playwright/test';
import { URLS, TEST_DATA, TEST_USER } from '../utils/constants';

/**
 * Page Object Model for Register Page
 * Centralizes all selectors and actions for user registration
 */
export class RegisterPage {
  readonly page: Page;
  
  // Form selectors
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly nationalityInput: Locator;
  readonly phoneInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly loginLink: Locator;
  readonly pageHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Using data-testid for reliable selectors
    this.firstNameInput = page.getByTestId('register-firstName');
    this.lastNameInput = page.getByTestId('register-lastName');
    this.emailInput = page.getByTestId('register-email');
    this.nationalityInput = page.getByTestId('register-nationality');
    this.phoneInput = page.getByTestId('register-phone');
    this.passwordInput = page.getByTestId('register-password');
    
    this.submitButton = page.getByRole('button', { name: /Registrarse|Crear cuenta/i });
    this.loginLink = page.getByRole('link', { name: /Inicia sesión/i });
    this.pageHeading = page.getByRole('heading', { name: /Crear cuenta/i });
  }

  /**
   * Navigate to register page
   */
  async goto() {
    await this.page.goto(URLS.REGISTER);
  }

  /**
   * Fill registration form with custom data
   */
  async fillRegistrationForm(data: {
    firstName: string;
    lastName: string;
    email: string;
    nationality: string;
    phone: string;
    password: string;
  }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.nationalityInput.fill(data.nationality);
    await this.phoneInput.fill(data.phone);
    await this.passwordInput.fill(data.password);
  }

  /**
   * Fill registration form with test data
   */
  async fillWithTestData() {
    await this.fillRegistrationForm({
      firstName: TEST_DATA.USER.FIRST_NAME,
      lastName: TEST_DATA.USER.LAST_NAME,
      email: `playwright${Date.now()}@nutriapp.com`,
      nationality: TEST_DATA.USER.NATIONALITY,
      phone: TEST_DATA.USER.PHONE,
      password: TEST_USER.PASSWORD,
    });
  }

  /**
   * Submit registration form
   */
  async submit() {
    await this.submitButton.click();
  }

  /**
   * Navigate to login page
   */
  async goToLogin() {
    await this.loginLink.click();
  }

  /**
   * Verify we're on register page
   */
  async verifyOnRegisterPage() {
    await expect(this.page).toHaveURL(/.*register/);
    await expect(this.pageHeading).toBeVisible();
  }

  /**
   * Verify all required fields are visible
   */
  async verifyAllFieldsVisible() {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.nationalityInput).toBeVisible();
    await expect(this.phoneInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  /**
   * Wait for redirect to login after successful registration
   */
  async waitForRedirectToLogin() {
    await expect(this.page).toHaveURL(/.*login/);
  }
}
