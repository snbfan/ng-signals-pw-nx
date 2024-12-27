import { Locator, Page } from '@playwright/test';

import { BaseFragment } from './BaseFragment';
 
class HeaderFragment extends BaseFragment {
  public headerLink: Locator;

  constructor(page: Page) {
    super(page, { root: page.locator('#header') });
    this.headerLink = page.locator('#header-link');
  }
}

export { HeaderFragment };
