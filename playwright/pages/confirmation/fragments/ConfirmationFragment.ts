import { Locator, Page } from '@playwright/test';

import { BaseFragment } from '../../reusable/fragments/BaseFragment';

export class ConfirmationFragment extends BaseFragment {
  public successMessage: Locator;
  public startAllOverButton: Locator;

  constructor(page: Page) {
    super(page, { root: page.locator('app-confirmation') });
    this.successMessage = page.locator('#input-firstName');
    this.startAllOverButton = page.locator('#input-lastName');
  }
}
