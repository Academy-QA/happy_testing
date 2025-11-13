import { Page, Locator, expect } from '@playwright/test';
import { URLS, TEST_USER } from '../utils/constants';

/**
 * Page Object Model for Homepage
 * Centralizes all selectors and actions for the homepage
 */
export class HomePage {
  readonly page: Page;
  
  // Selectors
  readonly welcomeHeading: Locator;
  readonly emailDisplay: Locator;
  readonly passwordDisplay: Locator;
  readonly goToLoginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.welcomeHeading = page.getByRole('heading', { name: /Welcome to NutriApp/i });
    this.emailDisplay = page.getByText(TEST_USER.DISPLAY_EMAIL);
    this.passwordDisplay = page.getByText(TEST_USER.DISPLAY_PASSWORD);
    this.goToLoginLink = page.getByRole('link', { name: /Go to Login/i });
  }

  /**
   * Navigate to homepage
   */
  async goto() {
    await this.page.goto(URLS.HOME);
  }

  /**
   * Verify welcome message is visible
   */
  async verifyWelcomeMessage() {
    await expect(this.welcomeHeading).toBeVisible();
  }

  /**
   * Verify test credentials are displayed
   */
  async verifyCredentialsVisible() {
    await expect(this.emailDisplay).toBeVisible();
    await expect(this.passwordDisplay).toBeVisible();
  }

  /**
   * Navigate to login page
   */
  async goToLogin() {
    await this.goToLoginLink.click();
  }

  /**
   * Verify login link is visible
   */
  async verifyLoginLinkVisible() {
    await expect(this.goToLoginLink).toBeVisible();
  }
}
