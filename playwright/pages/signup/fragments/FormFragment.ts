import { Locator, Page } from '@playwright/test';

import { BaseFragment } from '../../reusable/fragments/BaseFragment';

export interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class FormFragment extends BaseFragment {
  public firstName: Locator;
  public lastName: Locator;
  public email: Locator;
  public password: Locator;
  public submitButton: Locator;
  public eyeToggle: Locator;
  public eyeOpen: Locator;
  public eyeCrossed: Locator;
  public invalidInputError: Locator;
  public errorMessage: Locator;

  constructor(page: Page) {
    super(page, { root: page.locator('app-sign-up') });
    this.firstName = page.locator('#input-firstName');
    this.lastName = page.locator('#input-lastName');
    this.email = page.locator('#input-email');
    this.password = page.locator('#input-password');
    this.submitButton = page.locator('#submit-button');

    this.eyeToggle = page.locator('#eye-toggle');
    this.eyeOpen = page.locator('#eye-open');
    this.eyeCrossed = page.locator('#eye-crossed');

    this.invalidInputError = page.locator('app-form-error-overview');
    this.errorMessage = page.locator('#error-message');
  }

  public async fillForm(fields: FormFields): Promise<void> {
    await this.firstName.fill(fields.firstName);
    await this.lastName.fill(fields.lastName);
    await this.email.fill(fields.email);
    await this.password.fill(fields.password);
  }
}
