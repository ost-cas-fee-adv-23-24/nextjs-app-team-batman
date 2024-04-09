import { E2EPageObject } from '@/e2e/helpers/models/e2e-page-object';
import { expect } from '@playwright/test';
import { TagsPageObject } from './tags-page-object';

const test = E2EPageObject.initTest({
  pageObject: TagsPageObject,
});

test.describe(`Check ${TagsPageObject.url}`, () => {
  test.describe('user: @anonymous', () => {
    test.beforeEach(async ({ pageObject }) => {
      await pageObject.navigate();
    });

    test('should be reachable & has basic elements', async ({ pageObject }) => {
      await pageObject.isReachable();
      await expect(pageObject.elements.heading_1).toBeVisible();
      await expect(pageObject.page).toHaveTitle('Mumble - Team Batman');
    });
  });

  test.describe('user: @logged-in', () => {
    test.beforeEach(async ({ pageObject }) => {
      await pageObject.login();
      await pageObject.navigate();
    });

    test('should be reachable & has basic elements', async ({ pageObject }) => {
      await pageObject.isReachable();
      await expect(pageObject.elements.heading_1).toBeVisible();
      await expect(pageObject.page).toHaveTitle('Mumble - Team Batman');
    });
  });
});
