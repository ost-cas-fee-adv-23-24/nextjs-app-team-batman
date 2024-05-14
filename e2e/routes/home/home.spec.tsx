import { MIN_DELAY } from '@/app/app-config';
import { E2EPageObject } from '@/e2e/helpers/models/e2e-page-object';
import { expect } from '@playwright/test';
import { HomePageObject } from './home-page-object';

const test = E2EPageObject.initTest({
  pageObject: HomePageObject,
});

test.describe(`Check ${HomePageObject.url}`, () => {
  test.describe('user: @anonymous', () => {
    test.beforeEach(async ({ pageObject }) => {
      await pageObject.navigate();
    });

    test.describe('@layout', () => {
      test('should be reachable & has basic elements', async ({ pageObject }) => {
        await pageObject.isReachable();

        await pageObject.shouldHaveBasicElements(false);
        await expect(pageObject.elements.heading_1).toHaveText('Willkommen auf Mumble');
      });

      test('should show 10 loaded posts', async ({ pageObject }) => {
        await pageObject.shouldShowAmountOfPosts(10);
      });

      test('should load 10 more on scroll to bottom', async ({ pageObject }) => {
        await pageObject.scrollToBottom();
        await expect(pageObject.elements.mumblePost).toHaveCount(20);
      });
    });
  });

  test.describe('user: @authenticated', () => {
    test.beforeEach(async ({ pageObject }) => {
      await pageObject.login();
      await pageObject.navigate();
    });

    test.describe('@layout', () => {
      test('should be reachable & has basic elements', async ({ pageObject }) => {
        await pageObject.shouldHaveBasicElements(true);
        await expect(pageObject.elements.heading_1).toHaveText('Willkommen auf Mumble');
      });

      test('should show 10 loaded posts', async ({ pageObject }) => {
        await pageObject.shouldShowAmountOfPosts(10);
      });

      test('should load 10 more on scroll to bottom', async ({ pageObject }) => {
        await pageObject.page.waitForTimeout(MIN_DELAY);
        await pageObject.scrollToBottom();
        await pageObject.shouldShowAmountOfPosts(20);
      });
    });

    test.describe('@create-post', () => {
      test('should create new post', async ({ pageObject }) => {
        const currentMumbleCard = await pageObject.createPost();

        await test.step('should like & unlike the post', async () => {
          await pageObject.likePost(currentMumbleCard);
          await pageObject.unlikePost(currentMumbleCard);
        });

        await test.step('should open post detail page on comment button click', async () => {
          await pageObject.openPostViaCommentButton(currentMumbleCard);

          await pageObject.page.goBack();
          await expect(pageObject.page).toHaveURL(pageObject.url);
        });

        await test.step('should copy the share link and open correct page', async () => {
          await pageObject.copyAndOpenViaShareButton(currentMumbleCard);
          await pageObject.page.goBack();
          await expect(pageObject.page).toHaveURL(pageObject.url);
        });

        await test.step('should delete the post', async () => {
          await pageObject.deletePost(currentMumbleCard);
        });
      });
    });
  });
});
