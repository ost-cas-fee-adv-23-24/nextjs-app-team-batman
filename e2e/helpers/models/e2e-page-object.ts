/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { Locator, Page, expect } from '@playwright/test';
import { randomUUID } from 'crypto';
import dotenv from 'dotenv';
import { configInitTest } from '../config/config-init-test';
import { E2EGlobalElements } from './e2e-global-elements';
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
dotenv.config({ path: '.env.local' });

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
  public postText: string;

  public constructor(payload: IE2EPageObjectConstructor) {
    this.page = payload.page;
    this.url = payload.url;
    this.postText = `batman-e2e-test-${randomUUID()} #e2ebatman`;
  }

  public static url = '';

  /**
   * @description 🔰 fixture to initialize tests 🚨 USE THIS IN EACH TEST-FILE  🚨
   * @info: it works like a before each & create a re-usable instance of 'pageObject'
   */
  public static get initTest() {
    return configInitTest;
  }

  /**
   * @description global ui elements
   */
  public get elements() {
    return new E2EGlobalElements({ page: this.page });
  }

  /**
   * @description login with e2e user
   */
  public async login() {
    await this.page.goto(RouteService.page(PAGE_ROUTES.HOME));

    if (await this.elements.loginButton.isHidden()) return;

    await this.elements.loginButton.click();
    if (!process.env.E2E_ZITADEL_USER || !process.env.E2E_ZITADEL_PASSWORD) {
      throw new Error('env variables missing for e2e!');
    }

    await this.page.locator('#loginName').fill(process.env.E2E_ZITADEL_USER);
    await this.page.locator('#submit-button').click();
    await this.page.locator('#password').fill(process.env.E2E_ZITADEL_PASSWORD);
    await this.page.locator('#submit-button').click();
    await this.page.goto(PAGE_ROUTES.HOME);
    await expect(this.page).toHaveURL(PAGE_ROUTES.HOME);
  }

  public async navigate(url = this.url) {
    await this.page.goto(url);
  }

  /**
   * @description check if the page is reachable
   */
  public async isReachable() {
    await this.page.goto(this.url);
    await expect(this.page, '🔒 page should be reachable').toHaveURL(this.url);
  }

  /**
   * @description  create a post
   */
  public async createPost() {
    await this.login();
    await this.elements.mumbleCreateText.fill(this.postText);
    await this.elements.mumbleCreate.getByTestId('mumble-create--send').click();

    await expect(this.elements.mumbleCreateText, 'should reset textarea').toHaveValue('');

    const currentMumbleCard = this.elements.mumbleCardByText(this.postText);
    await expect(currentMumbleCard, 'post should be visible on page').toBeVisible();

    return currentMumbleCard;
  }

  /**
   * @description like a post
   */
  public async likePost(currentMumbleCard: Locator) {
    const likeButton = currentMumbleCard.getByTestId('mumble-post--like');
    const likeCount = Number(await likeButton.getAttribute('data-like-count'));
    if (likeCount === 0) {
      await expect(likeButton, 'should show 0 likes state').toHaveText('Like');
      await likeButton.click();
      await expect(likeButton, 'should show animation text').toHaveText('Liked');
      await expect(likeButton, 'should show ascending count').toHaveText('1 Like');
      return;
    }

    await expect(likeButton, 'should show real count').toHaveText(`${likeCount} Likes`);
    await likeButton.click();
    await expect(likeButton, 'should show animation text').toHaveText('Liked');
    await expect(likeButton, 'should show ascending count').toHaveText(`${likeCount + 1} Likes`);
  }

  /**
   * @description unlike a post
   */
  public async unlikePost(currentMumbleCard: Locator) {
    const likeButton = currentMumbleCard.getByTestId('mumble-post--like');
    const likeCount = Number(await likeButton.getAttribute('data-like-count'));
    if (likeCount > 0) {
      const likeButtonTextBefore = likeCount === 1 ? '1 Like' : `${likeCount} Likes`;
      const likeButtonTextAfter = likeCount === 1 ? 'Like' : `${likeCount + 1} Likes`;
      await expect(likeButton, 'should show real count').toHaveText(likeButtonTextBefore);
      await likeButton.click();
      await expect(likeButton, 'should show descending count').toHaveText(likeButtonTextAfter);
    }
  }

  /**
   * @description copy a post and open it via share button
   */
  public async copyAndOpenViaShareButton(currentMumbleCard: Locator) {
    const copyButton = currentMumbleCard.getByTestId('mumble-post--copy');
    await expect(copyButton, 'should reset text').toHaveText('Copy Link');
    await copyButton.click();
    await expect(copyButton, 'should reset text').toHaveText('Copy Link');

    const clipboardContent = await this.page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardContent).toContain(RouteService.page(PAGE_ROUTES.POSTS, { id: '' }));

    await this.page.goto(clipboardContent);
    await expect(this.page).toHaveURL(clipboardContent);
    await expect(currentMumbleCard, 'post should be visible on page').toBeVisible();

    return clipboardContent;
  }

  /**
   * @description basic elements that should or shouldn't be visible on every
   */
  public async shouldHaveBasicElements(authenticated: boolean) {
    await expect(this.page).toHaveTitle('Mumble - Team Batman');

    if (authenticated) {
      await expect(this.elements.logoutButton).toBeVisible();
      await expect(this.elements.headerAvatar).toBeVisible();
      await expect(this.elements.modalSettingsButton).toBeVisible();
      await expect(this.elements.loginButton).toBeHidden();
      return;
    }

    await expect(this.elements.logoutButton).toBeHidden();
    await expect(this.elements.headerAvatar).toBeHidden();
    await expect(this.elements.modalSettingsButton).toBeHidden();
    await expect(this.elements.loginButton).toBeVisible();
  }

  /**
   * @description check if the amount of visible posts is correct
   */
  public async shouldShowAmountOfPosts(count: number) {
    await expect(this.elements.mumblePost).toHaveCount(count);
    await expect(this.elements.mumblePostCopy).toHaveCount(count);
  }

  /**
   * @description delete a post
   */
  public async deletePost(currentMumbleCard: Locator) {
    await this.page.goto(RouteService.page(PAGE_ROUTES.HOME));
    await currentMumbleCard.getByTestId('mumble-post--comment').click();
    await expect(this.page).toHaveURL(new RegExp(`.*${RouteService.page(PAGE_ROUTES.POSTS, { id: '' })}.*`));
    await this.elements.mumblePostDelete.first().click();

    await expect(this.page).toHaveURL(RouteService.page(PAGE_ROUTES.HOME));
    await expect(currentMumbleCard, 'post should not be visible on page').not.toBeVisible();

    await this.page.goBack();
    await expect(this.page).toHaveURL(new RegExp(`.*${RouteService.page(PAGE_ROUTES.POSTS, { id: '' })}.*`));
    await expect(this.elements.notFoundButton, '404 page is shown').toBeVisible();
    await this.elements.notFoundButton.click();
    await expect(this.page).toHaveURL(RouteService.page(PAGE_ROUTES.HOME));
  }

  /**
   * @description open a post via comment button
   */
  public async openPostViaCommentButton(currentMumbleCard: Locator) {
    const commentButton = currentMumbleCard.getByTestId('mumble-post--comment');

    await expect(commentButton).toHaveText('Comment');
    await commentButton.click();

    await expect(this.page).toHaveURL(new RegExp(`.*${RouteService.page(PAGE_ROUTES.POSTS, { id: '' })}.*`));
    await expect(currentMumbleCard, 'post should be visible on page').toBeVisible();
  }

  /**
   * @description reusable function to scroll to bottom of page
   */
  public async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }
}
