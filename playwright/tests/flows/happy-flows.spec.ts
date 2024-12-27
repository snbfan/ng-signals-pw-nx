import { expect } from '@playwright/test';

import { test } from '../../helpers/base-test';

test.describe('Happy flows', async () => {
  test.beforeEach(async ({ signupPage }) => {
    await signupPage.open();
  })

  test('Page should be submitted when form is valid', async ({ signupPage, confirmationPage }) => {
    await signupPage.page.route('*/**/users', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ _id: '1' }),
      });
    });

    await signupPage.formFragment.fillForm({
      firstName: 'A',
      lastName: 'B',
      email: 'a@a.a',
      password: 'tyuiiolP'
    });
    await signupPage.formFragment.submitButton.click();

    expect(await confirmationPage.isOpen(), 'User should be on /confirmation page').toBe(true);
  });
});
