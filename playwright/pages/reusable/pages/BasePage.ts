import { Page } from '@playwright/test';

const urls = {
  projectUrlLocal: 'http://localhost:4200',
};

export class BasePage {
  public path: string;

  constructor(
    public page: Page,
    { path }: { path: string },
  ) {
    this.path = path;
  }

  public async open() {
    return this.page.goto(`${urls.projectUrlLocal}/${this.path}`);
  }

  public async isOpen({ withWait = true }: { withWait?: boolean } = { withWait: true }): Promise<boolean> {
    if (withWait) {
      await this.page.waitForURL((url) => url.toString().includes(this.path));
      return true;
    }
    return this.page.url().includes(this.path);
  }
}
