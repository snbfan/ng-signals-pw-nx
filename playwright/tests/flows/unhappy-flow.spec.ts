import { expect } from '@playwright/test';

import { test } from '../../helpers/base-test';

test.describe('Unhappy flows', async () => {
  test.beforeEach(async ({ signupPage }) => {
    await signupPage.open();
  })

  test('Page should not be submitted when form is empty', async ({ signupPage }) => {
    await signupPage.formFragment.submitButton.click();

    expect(await signupPage.isOpen(), 'User should stay on /signup page').toBe(true);
  });

  test('Page should not be submitted when email is invalid', async ({ signupPage }) => {
    await signupPage.formFragment.fillForm({
      firstName: 'A',
      lastName: 'B',
      email: 'C',
      password: 'qwerTyuio'
    })
    await signupPage.formFragment.submitButton.click();

    expect(await signupPage.isOpen(), 'User should stay on /signup page').toBe(true);
  });

  test('Page should not be submitted when password is invalid', async ({ signupPage }) => {
    await signupPage.formFragment.fillForm({
      firstName: 'A',
      lastName: 'B',
      email: 'a@a.a',
      password: 'qwer'
    });
    await signupPage.formFragment.submitButton.click();

    expect(await signupPage.isOpen(), 'User should stay on /signup page').toBe(true);
  });

  test('Page should not be submitted when password is compromised #1', async ({ signupPage }) => {
    await signupPage.formFragment.fillForm({
      firstName: 'A',
      lastName: 'B',
      email: 'a@a.a',
      password: 'AwerTyuio'
    });
    await signupPage.formFragment.submitButton.click();

    expect(await signupPage.isOpen(), 'User should stay on /signup page').toBe(true);
  });

  test('Page should not be submitted when password is compromised #2', async ({ signupPage }) => {
    await signupPage.formFragment.fillForm({
      firstName: 'A',
      lastName: 'B',
      email: 'a@a.a',
      password: 'BwerTyuio'
    });
    await signupPage.formFragment.submitButton.click();

    expect(await signupPage.isOpen(), 'User should stay on /signup page').toBe(true);
  });

  test('Input error message should be shown', async ({ signupPage }) => {
    await signupPage.formFragment.firstName.click();
    await signupPage.formFragment.firstName.blur();

    expect(await signupPage.formFragment.invalidInputError.isVisible()).toBe(true);
    expect(await signupPage.isOpen(), 'User should stay on /signup page').toBe(true);
  });

  test('Page should not be submitted when backend call fails', async ({ signupPage }) => {
    await signupPage.page.route('*/**/users', (route) => {
      route.fulfill({
        status: 404,
        body: JSON.stringify({ error: 'Not Found' }),
      });
    });

    await signupPage.formFragment.fillForm({
      firstName: 'A',
      lastName: 'B',
      email: 'a@a.a',
      password: 'tyuiiolP'
    });
    await signupPage.formFragment.submitButton.click();

    expect(await signupPage.formFragment.errorMessage.isVisible()).toBe(true);
    expect(await signupPage.isOpen(), 'User should stay on /signup page').toBe(true);
  });
});
