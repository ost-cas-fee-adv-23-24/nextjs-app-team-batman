import { E2EPageObject } from '@/e2e/helpers/models/e2e-page-object';
import { expect } from '@playwright/test';
import { HomePageObject } from './home-page-object';

const test = E2EPageObject.initTest({
  pageObject: HomePageObject,
});

test.describe(`Check ${HomePageObject.url}`, () => {
  test.beforeEach(async ({ pageObject }) => {
    await pageObject.navigate();
  });

  test('should be reachable & has basic elements', async ({ pageObject }) => {
    await pageObject.isReachable();
    await expect(pageObject.elements.heading_1).toBeVisible();
    await expect(pageObject.page).toHaveTitle('Mumble - Team Batman');
  });
});
