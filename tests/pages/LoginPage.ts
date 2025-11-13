import { Page, Locator, expect } from '@playwright/test';
import { URLS, TEST_USER, TIMEOUTS } from '../utils/constants';

/**
 * Page Object Model for Login Page
 * Centralizes all selectors and actions for the login page
 */
export class LoginPage {
  readonly page: Page;
  
  // Selectors - centralized in one place
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly registerLink: Locator;
  readonly errorMessage: Locator;
  readonly welcomeHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Using data-testid for reliable selectors
    this.emailInput = page.getByTestId('login-email');
    this.passwordInput = page.getByTestId('login-password');
    this.submitButton = page.getByTestId('login-submit');
    
    // Using role and text for semantic elements
    this.registerLink = page.getByRole('link', { name: /Regístrate/i });
    this.errorMessage = page.getByText(/Invalid credentials/i);
    this.welcomeHeading = page.getByRole('heading', { name: /Bienvenido/i });
  }

  /**
   * Navigate to login page
   */
  async goto() {
    await this.page.goto(URLS.LOGIN);
  }

  /**
   * Fill login form with custom credentials
   */
  async fillLoginForm(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  /**
   * Fill login form with test user credentials
   */
  async fillTestUserCredentials() {
    await this.fillLoginForm(TEST_USER.EMAIL, TEST_USER.PASSWORD);
  }

  /**
   * Submit the login form
   */
  async submit() {
    await this.submitButton.click({ force: true });
  }

  /**
   * Complete login flow with test user
   */
  async loginAsTestUser() {
    await this.goto();
    await this.fillTestUserCredentials();
    await this.submit();
    await this.waitForDishesPage();
  }

  /**
   * Complete login flow with custom credentials
   */
  async login(email: string, password: string) {
    await this.goto();
    await this.fillLoginForm(email, password);
    await this.submit();
  }

  /**
   * Wait for redirect to dishes page after successful login
   */
  async waitForDishesPage() {
    await expect(this.page).toHaveURL(/.*dishes/, { timeout: TIMEOUTS.PAGE_LOAD });
  }

  /**
   * Verify error message is visible
   */
  async verifyErrorMessage() {
    await expect(this.errorMessage).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
  }

  /**
   * Verify we're on login page
   */
  async verifyOnLoginPage() {
    await expect(this.page).toHaveURL(/.*login/);
    await expect(this.welcomeHeading).toBeVisible();
  }

  /**
   * Navigate to register page
   */
  async goToRegister() {
    await this.registerLink.click();
  }
}
