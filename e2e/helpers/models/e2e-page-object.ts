/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
import { Page, expect } from '@playwright/test';
import { configInitTest } from '../config/config-init-test';
import { E2EGlobalElements } from './e2e-global-elements';

export interface IE2EPageObjectConstructor {
  page: Page;
  url: string;
}

export type TE2EUser = {
  email: string;
  password: string;
};

export class E2EPageObject {
  public readonly url: string;
  public page: Page;

  public constructor(payload: IE2EPageObjectConstructor) {
    this.page = payload.page;
    this.url = payload.url;
  }

  public static url = '';
  public static workflowType = null;

  /**
   * @description 🔰 fixture to initialize tests 🚨 USE THIS IN EACH TEST-FILE  🚨
   * @info: it works like a before each & create a re-usable instance of 'pageObject'
   */
  public static get initTest() {
    return configInitTest;
  }

  public async navigate(url = this.url) {
    await this.page.goto(url);
  }

  /**
   * @description 🔒✅ check if the page is reachable
   */
  public async isReachable() {
    await this.page.goto(this.url);
    await expect(this.page, '🔒 page should be reachable').toHaveURL(this.url);
  }

  /**
   * @description 🧩 global ui elements
   */
  public get gloabalElements() {
    return new E2EGlobalElements({ page: this.page });
  }
}
