import { Locator, Page } from '@playwright/test';
 
export class BaseFragment {
  public root: Locator;

  constructor(
    public page: Page,
    { root }: { root: Locator },
  ) {
    this.root = root;
  }

  async waitTillVisibilityIs(visibility: boolean) {
    if (visibility === true) {
      await this.root!.waitFor({ state: 'visible' });
    } else {
      await this.root!.waitFor({ state: 'hidden' });
    }
  }
}
