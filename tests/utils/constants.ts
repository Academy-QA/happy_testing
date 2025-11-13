/**
 * Centralized constants for tests
 * Keep all URLs, credentials, and magic numbers in one place
 */

export const BASE_URL = 'http://localhost:3000';

export const URLS = {
  HOME: `${BASE_URL}`,
  LOGIN: `${BASE_URL}/login`,
  REGISTER: `${BASE_URL}/register`,
  DISHES: `${BASE_URL}/dishes`,
  NEW_DISH: `${BASE_URL}/dishes/new`,
  DISH_VIEW: (id: number) => `${BASE_URL}/dishes/${id}/view`,
  DISH_EDIT: (id: number) => `${BASE_URL}/dishes/${id}`,
} as const;

export const TEST_USER = {
  EMAIL: 'test@nutriapp.com',
  PASSWORD: 'nutriapp123',
  DISPLAY_EMAIL: 'Email: test@nutriapp.com',
  DISPLAY_PASSWORD: 'Password: nutriapp123',
} as const;

export const TIMEOUTS = {
  SHORT: 1000,
  MEDIUM: 5000,
  LONG: 10000,
  EXTRA_LONG: 15000,
  PAGE_LOAD: 30000,
  CLIENT_SIDE_DATA: 4000,
} as const;

export const TEST_DATA = {
  DISH: {
    NAME_PREFIX: 'Platillo Test',
    DESCRIPTION: 'Creado por prueba E2E automatizada',
    PREP_TIME: '10',
    COOK_TIME: '15',
    CALORIES: '250',
    IMAGE_URL: 'https://ejemplo.com/imagen.jpg',
    STEP_1: 'Preparar ingredientes',
  },
  USER: {
    FIRST_NAME: 'Usuario Test',
    LAST_NAME: 'Playwright',
    NATIONALITY: 'MX',
    PHONE: '1234567890',
  },
} as const;
