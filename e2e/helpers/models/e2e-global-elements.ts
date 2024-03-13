import { Page } from '@playwright/test';

interface IE2EGlobalElements {
  page: Page;
}

export class E2EGlobalElements {
  public readonly page: Page;

  public constructor(payload: IE2EGlobalElements) {
    this.page = payload.page;
  }
}
