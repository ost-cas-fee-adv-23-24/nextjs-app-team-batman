import { E2EPageObject } from '@/e2e/helpers/models/e2e-page-object';
import { expect } from '@playwright/test';
import { UserPageObject } from './user-page-object';

const test = E2EPageObject.initTest({
  pageObject: UserPageObject,
});

test.describe(`Check ${UserPageObject.url}`, () => {
  test.describe('user: @anonymous', () => {
    test.beforeEach(async ({ pageObject }) => {
      await pageObject.navigate();
    });

    test('should be reachable & has basic elements', async ({ pageObject }) => {
      await pageObject.isReachable();
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
      await expect(pageObject.page).toHaveTitle('Mumble - Team Batman');
    });

    test('should upload new profile image', async ({ pageObject }) => {
      await expect(pageObject.elements.modalImageUpload).toBeHidden();
      await pageObject.page.getByTestId('avatar-wrapper').locator('button').click();
      await expect(pageObject.elements.modalImageUpload).toBeVisible();
    });

    test('should switch tabs ', async ({ pageObject }) => {
      const tabGroup = pageObject.page.locator('div[aria-orientation="horizontal"]');

      await tabGroup.locator('button:has-text("Likes")').click();
      await expect(pageObject.page).toHaveURL(`${UserPageObject.url}/liked`);

      await tabGroup.locator('button:has-text("I follow")').click();
      await expect(pageObject.page).toHaveURL(`${UserPageObject.url}/follow`);

      await tabGroup.locator('button:has-text("Mumbles")').click();
      await expect(pageObject.page).toHaveURL(`${UserPageObject.url}`);
    });
  });
});
