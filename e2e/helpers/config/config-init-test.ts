/* eslint-disable @typescript-eslint/no-explicit-any */
import { test } from '@playwright/test';
import { E2EPageObject } from '../models/e2e-page-object';

type TConfigInitTest<T> = {
  pageObject: T;
};

export type TInitTest = ReturnType<typeof configInitTest>;

/**
 * @docs https://playwright.dev/docs/test-fixtures
 * @docs https://playwright.dev/docs/auth
 */
export const configInitTest = <T extends typeof E2EPageObject>(payload: TConfigInitTest<T>) => {
  if (payload.pageObject.url === null || payload.pageObject.url === undefined) {
    throw new Error('🚫 url is required');
  }

  const baseTest = test.extend<{ pageObject: InstanceType<T> }>({
    pageObject: async ({ page }, use) => {
      const pageObject = new payload.pageObject({
        page,
        url: payload.pageObject.url,
      });
      await use(pageObject as InstanceType<T>);
    },
  });

  return baseTest;
};
