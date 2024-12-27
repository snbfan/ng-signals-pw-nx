import { Page } from '@playwright/test';

import { HeaderFragment } from '../reusable/fragments';
import { BasePage } from '../reusable/pages/BasePage';

import { FormFragment } from './fragments';

export class SignupPage extends BasePage {
  headerFragment: HeaderFragment;
  formFragment: FormFragment;

  constructor(page: Page) {
    super(page, { path: 'signup' });
    this.headerFragment = new HeaderFragment(page);
    this.formFragment = new FormFragment(page);
  }
}
