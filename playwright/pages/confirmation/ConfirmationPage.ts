import { Locator, Page } from '@playwright/test';

import { HeaderFragment } from '../reusable/fragments';
import { BasePage } from '../reusable/pages/BasePage';

import { ConfirmationFragment } from './fragments';

export class ConfirmationPage extends BasePage {
  headerFragment: HeaderFragment;
  confirmationFragment: ConfirmationFragment;
  rejectButton: Locator;

  constructor(page: Page) {
    super(page, { path: 'confirmation' });

    this.headerFragment = new HeaderFragment(page);
    this.confirmationFragment = new ConfirmationFragment(page);
  }
}
