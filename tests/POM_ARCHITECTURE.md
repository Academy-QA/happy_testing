# 🏗️ Test Architecture - Page Object Model

## Overview
This project uses the **Page Object Model (POM)** design pattern to create maintainable, reusable, and scalable E2E tests with Playwright.

## 📁 Project Structure

```
tests/
├── pages/                    # Page Object Models
│   ├── LoginPage.ts         # Login page selectors & actions
│   ├── DishesPage.ts        # Dishes list page
│   ├── DishFormPage.ts      # Dish create/edit form
│   ├── DishViewPage.ts      # Dish detail view
│   ├── RegisterPage.ts      # Registration page
│   ├── HomePage.ts          # Homepage
│   └── index.ts             # Centralized exports
│
├── fixtures/                 # Test fixtures
│   └── pageFixtures.ts      # Custom fixtures with Page Objects
│
├── utils/                    # Shared utilities
│   └── constants.ts         # URLs, credentials, timeouts, test data
│
└── *.spec.ts                # Test files
```

## 🎯 Key Benefits

### 1. **Centralized Selectors**
All selectors are defined once in Page Objects, not scattered across tests.

**❌ Before (Hard to maintain):**
```typescript
test('login', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByTestId('login-email').fill('test@nutriapp.com');
  await page.getByTestId('login-password').fill('nutriapp123');
  await page.getByTestId('login-submit').click({ force: true });
});
```

**✅ After (Easy to maintain):**
```typescript
test('login', async ({ loginPage }) => {
  await loginPage.loginAsTestUser();
});
```

### 2. **Reusable Actions**
Common actions are encapsulated in methods, reducing duplication.

**Benefits:**
- Write once, use everywhere
- Single point of change when UI updates
- Consistent behavior across tests

### 3. **Type Safety**
Full TypeScript support with autocomplete and type checking.

### 4. **Better Readability**
Tests read like business requirements, not implementation details.

## 📝 Usage Examples

### Basic Test with Page Objects

```typescript
import { test, expect } from './fixtures/pageFixtures';

test('user can add a new dish', async ({ loginPage, dishesPage, dishFormPage }) => {
  // Login
  await loginPage.loginAsTestUser();
  
  // Navigate to form
  await dishesPage.clickAddDish();
  
  // Fill and submit
  await dishFormPage.fillWithTestData('My Test Dish');
  await dishFormPage.submit();
  
  // Verify
  await dishesPage.verifyDishVisible('My Test Dish');
});
```

### Using Constants

```typescript
import { TEST_USER, URLS, TIMEOUTS } from './utils/constants';

// Access centralized values
const email = TEST_USER.EMAIL;           // 'test@nutriapp.com'
const loginUrl = URLS.LOGIN;             // 'http://localhost:3000/login'
const timeout = TIMEOUTS.LONG;           // 10000
```

### Custom Login Credentials

```typescript
test('login with custom user', async ({ loginPage }) => {
  await loginPage.login('custom@email.com', 'password123');
});
```

### Accessing Raw Page Object

```typescript
test('complex interaction', async ({ loginPage, page }) => {
  await loginPage.loginAsTestUser();
  
  // Access raw Playwright page when needed
  await page.screenshot({ path: 'screenshot.png' });
});
```

## 🔧 Page Object Pattern

Each Page Object follows this structure:

```typescript
export class ExamplePage {
  readonly page: Page;
  
  // 1. Define selectors as readonly properties
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    
    // 2. Initialize selectors (prefer data-testid)
    this.emailInput = page.getByTestId('email-input');
    this.submitButton = page.getByRole('button', { name: /submit/i });
  }
  
  // 3. Create action methods
  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }
  
  // 4. Create verification methods
  async verifyOnPage() {
    await expect(this.emailInput).toBeVisible();
  }
  
  // 5. Create high-level workflow methods
  async completeForm(data: FormData) {
    await this.fillEmail(data.email);
    await this.submitButton.click();
  }
}
```

## 📦 Available Page Objects

### LoginPage
```typescript
await loginPage.goto();
await loginPage.loginAsTestUser();
await loginPage.login(email, password);
await loginPage.verifyErrorMessage();
await loginPage.verifyOnLoginPage();
await loginPage.goToRegister();
```

### DishesPage
```typescript
await dishesPage.goto();
await dishesPage.waitForPageLoad();
await dishesPage.verifyOnDishesPage();
await dishesPage.clickAddDish();
await dishesPage.clickFirstEdit();
await dishesPage.clickFirstView();
await dishesPage.clickFirstDelete();
await dishesPage.verifyDishVisible(name);
await dishesPage.logout();
await dishesPage.verifyNavbarVisible();
```

### DishFormPage
```typescript
await dishFormPage.gotoNew();
await dishFormPage.gotoEdit(id);
await dishFormPage.fillDishForm(data);
await dishFormPage.fillWithTestData(name);
await dishFormPage.addStep();
await dishFormPage.removeStep(index);
await dishFormPage.toggleQuickPrep();
await dishFormPage.submit();
await dishFormPage.waitForDataLoad();
```

### DishViewPage
```typescript
await dishViewPage.goto(id);
await dishViewPage.waitForPageLoad();
await dishViewPage.verifyDishNameVisible(name);
await dishViewPage.verifyPreparationStepsVisible();
await dishViewPage.verifyAllDetailsVisible();
```

### RegisterPage
```typescript
await registerPage.goto();
await registerPage.fillRegistrationForm(data);
await registerPage.fillWithTestData();
await registerPage.submit();
await registerPage.verifyOnRegisterPage();
await registerPage.verifyAllFieldsVisible();
```

### HomePage
```typescript
await homePage.goto();
await homePage.verifyWelcomeMessage();
await homePage.verifyCredentialsVisible();
await homePage.goToLogin();
```

## 🔑 Constants Reference

### URLs
```typescript
URLS.HOME          // 'http://localhost:3000'
URLS.LOGIN         // 'http://localhost:3000/login'
URLS.REGISTER      // 'http://localhost:3000/register'
URLS.DISHES        // 'http://localhost:3000/dishes'
URLS.NEW_DISH      // 'http://localhost:3000/dishes/new'
URLS.DISH_VIEW(id) // 'http://localhost:3000/dishes/{id}/view'
URLS.DISH_EDIT(id) // 'http://localhost:3000/dishes/{id}'
```

### Test User
```typescript
TEST_USER.EMAIL                 // 'test@nutriapp.com'
TEST_USER.PASSWORD              // 'nutriapp123'
TEST_USER.DISPLAY_EMAIL         // 'Email: test@nutriapp.com'
TEST_USER.DISPLAY_PASSWORD      // 'Password: nutriapp123'
```

### Timeouts
```typescript
TIMEOUTS.SHORT             // 1000ms
TIMEOUTS.MEDIUM            // 5000ms
TIMEOUTS.LONG              // 10000ms
TIMEOUTS.EXTRA_LONG        // 15000ms
TIMEOUTS.PAGE_LOAD         // 30000ms
TIMEOUTS.CLIENT_SIDE_DATA  // 4000ms
```

### Test Data
```typescript
TEST_DATA.DISH.NAME_PREFIX     // 'Platillo Test'
TEST_DATA.DISH.DESCRIPTION     // 'Creado por prueba E2E automatizada'
TEST_DATA.DISH.PREP_TIME       // '10'
TEST_DATA.DISH.COOK_TIME       // '15'
TEST_DATA.DISH.CALORIES        // '250'
TEST_DATA.DISH.IMAGE_URL       // 'https://ejemplo.com/imagen.jpg'
TEST_DATA.DISH.STEP_1          // 'Preparar ingredientes'

TEST_DATA.USER.FIRST_NAME      // 'Usuario Test'
TEST_DATA.USER.LAST_NAME       // 'Playwright'
TEST_DATA.USER.NATIONALITY     // 'MX'
TEST_DATA.USER.PHONE           // '1234567890'
```

## 🛠️ Best Practices

### 1. Use data-testid for Selectors
```typescript
// ✅ Stable, reliable
this.emailInput = page.getByTestId('login-email');

// ❌ Fragile, can break with design changes
this.emailInput = page.locator('input[type="email"]');
```

### 2. Use Semantic Selectors When Appropriate
```typescript
// ✅ Good for accessible elements
this.submitButton = page.getByRole('button', { name: /submit/i });
this.heading = page.getByRole('heading', { name: /welcome/i });
```

### 3. Create High-Level Methods
```typescript
// ✅ Business-focused
await loginPage.loginAsTestUser();

// ❌ Too low-level
await loginPage.emailInput.fill(email);
await loginPage.passwordInput.fill(password);
await loginPage.submitButton.click();
```

### 4. Keep Tests Independent
Each test should be able to run in isolation.

### 5. Use Descriptive Method Names
```typescript
// ✅ Clear intent
async verifyErrorMessage() { ... }
async waitForPageLoad() { ... }

// ❌ Unclear
async check() { ... }
async wait() { ... }
```

## 📚 Migration Guide

### Converting Old Tests

**Before:**
```typescript
import { test, expect } from '@playwright/test';

test('my test', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByTestId('login-email').fill('test@nutriapp.com');
  // ... more code
});
```

**After:**
```typescript
import { test, expect } from './fixtures/pageFixtures';

test('my test', async ({ loginPage }) => {
  await loginPage.loginAsTestUser();
});
```

### Steps:
1. Replace import statement
2. Add Page Object parameters to test function
3. Replace raw page interactions with Page Object methods
4. Remove duplicate helper functions

## 🎓 Learning Resources

- [Playwright Page Object Model](https://playwright.dev/docs/pom)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Test Automation Patterns](https://martinfowler.com/bliki/PageObject.html)

## 🚀 Running Tests

```bash
# Run all tests
npx playwright test --project=chromium

# Run specific test file
npx playwright test login_logout_e2e --project=chromium

# Run with UI mode
npx playwright test --ui

# Debug mode
npx playwright test --debug
```

## ✅ Benefits Summary

| Aspect | Before | After |
|--------|--------|-------|
| **Maintainability** | Update selectors in many files | Update once in Page Object |
| **Reusability** | Copy-paste code | Import and use methods |
| **Readability** | Low-level interactions | Business-focused actions |
| **Type Safety** | Manual types | Full IntelliSense |
| **Duplication** | High | Minimal |
| **Onboarding** | Steep learning curve | Clear structure |

---

**Last Updated:** After implementing Page Object Model architecture
**Status:** ✅ Production Ready
