import { E2EPageObject } from '@/e2e/helpers/models/e2e-page-object';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { Locator, expect } from '@playwright/test';
import { randomUUID } from 'crypto';
import { PostPageObject } from './post-page-object';

const test = E2EPageObject.initTest({
  pageObject: PostPageObject,
});

test.describe(`Check ${PostPageObject.url}`, () => {
  test.describe('user: @anonymous', () => {
    let currentMumbleCard: Locator;
    let postDetailViewUrl: string;
    test.beforeEach(async ({ pageObject }) => {
      currentMumbleCard = await pageObject.createPost();
      postDetailViewUrl = await pageObject.copyAndOpenViaShareButton(currentMumbleCard);
      // set to anonymous
      await pageObject.page.context().clearCookies();
      await pageObject.page.reload();

      await expect(pageObject.page).toHaveURL(postDetailViewUrl);
    });

    test.afterEach(async ({ pageObject }) => {
      await pageObject.login();
      await pageObject.deletePost(currentMumbleCard);
    });

    test.describe('@layout', () => {
      test('should have basic elements', async ({ pageObject }) => {
        await pageObject.shouldHaveBasicElements(false);
        await expect(currentMumbleCard, 'post should be visible on page').toBeVisible();
        await expect(pageObject.elements.noReplies).toBeVisible();
      });

      test('should show 1 loaded posts', async ({ pageObject }) => {
        await pageObject.shouldShowAmountOfPosts(1);
      });
    });
  });

  test.describe('user: @authenticated', () => {
    let currentMumbleCard: Locator;
    test.beforeEach(async ({ pageObject }) => {
      currentMumbleCard = await pageObject.createPost();
      const postDetailViewUrl = await pageObject.copyAndOpenViaShareButton(currentMumbleCard);
      await expect(pageObject.page).toHaveURL(postDetailViewUrl);
    });

    test.describe('@layout', () => {
      test('should be reachable & has basic elements', async ({ pageObject }) => {
        await pageObject.shouldHaveBasicElements(true);
        await expect(currentMumbleCard, 'post should be visible on page').toBeVisible();
        await expect(pageObject.elements.noReplies).toBeVisible();
        await expect(pageObject.elements.createReplyWrapper).toBeVisible();
      });

      test('should show 1 loaded posts', async ({ pageObject }) => {
        await pageObject.shouldShowAmountOfPosts(1);
      });
    });

    test.describe('@post-actions', () => {
      const replyText = `This is a reply ${randomUUID()}`;
      test('should create new reply', async ({ pageObject }) => {
        await pageObject.elements.mumbleCreateText.fill(replyText);
        await pageObject.elements.mumbleCreate.getByTestId('mumble-create--send').click();
        await expect(pageObject.elements.noReplies).toBeHidden();
        await expect(pageObject.elements.mumblePostByText(replyText)).toBeVisible();
        await pageObject.page.goto(RouteService.page(PAGE_ROUTES.HOME));
        await expect(currentMumbleCard.getByTestId('mumble-post--comment')).toHaveText('1 Comments');

        await test.step('should like & unlike the post', async () => {
          await pageObject.likePost(currentMumbleCard);
          await pageObject.unlikePost(currentMumbleCard);
        });

        await test.step('should copy the share link and open correct page', async () => {
          await pageObject.copyAndOpenViaShareButton(currentMumbleCard);
        });

        await test.step('should delete the post', async () => {
          await pageObject.deletePost(currentMumbleCard);
        });
      });
    });
  });
});
