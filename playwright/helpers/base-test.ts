import { test as baseTest } from '@playwright/test';

import { ConfirmationPage, SignupPage } from '../pages';

export const test = baseTest.extend<{
  signupPage: SignupPage;
  confirmationPage: ConfirmationPage;
}>({
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  confirmationPage: async ({ page }, use) => {
    await use(new ConfirmationPage(page));
  }
});
