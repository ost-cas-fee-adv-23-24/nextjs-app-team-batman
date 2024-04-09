import { Page } from '@playwright/test';

interface IE2EGlobalElements {
  page: Page;
}

export class E2EGlobalElements {
  public readonly page: Page;

  public constructor(payload: IE2EGlobalElements) {
    this.page = payload.page;
  }

  public get heading_1() {
    return this.page.locator('h1');
  }

  public get loginButton() {
    return this.page.getByTestId('login-button');
  }

  public get logoutButton() {
    return this.page.getByTestId('logout-button');
  }
}
