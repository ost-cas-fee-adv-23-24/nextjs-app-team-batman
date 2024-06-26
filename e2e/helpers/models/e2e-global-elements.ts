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

  public get createReplyWrapper() {
    return this.page.getByTestId('create-reply-wrapper');
  }

  public get noReplies() {
    return this.page.getByTestId('no-replies');
  }

  public get repliesWrapper() {
    return this.page.getByTestId('replies-wrapper');
  }

  public get headerLogo() {
    return this.page.getByTestId('header-logo');
  }
  public get headerAvatar() {
    return this.page.getByTestId('header-avatar');
  }

  public get postWrapper() {
    return this.page.getByTestId('post-wrapper');
  }

  public get modalImageUpload() {
    return this.page.getByTestId('modal-image-upload');
  }

  public get modalSettings() {
    return this.page.getByTestId('modal-settings');
  }

  public get modalSettingsButton() {
    return this.page.getByTestId('modal-settings-button');
  }

  public get modalSaveButton() {
    return this.page.getByTestId('modal--save');
  }

  public get mumbleCard() {
    return this.page.getByTestId('mumble-card');
  }

  public mumbleCardByText(text: string) {
    return this.page.locator(`[data-testid="mumble-card"]:has-text("${text}")`);
  }

  public mumblePostByText(text: string) {
    return this.page.locator(`[data-testid="mumble-post"]:has-text("${text}")`);
  }

  public get mumbleCreate() {
    return this.page.getByTestId('mumble-create');
  }

  public get mumbleCreateText() {
    return this.page.getByTestId('mumble-create--text');
  }

  public get mumbleCreateMedia() {
    return this.page.getByTestId('mumble-create--media');
  }

  public get mumbleCreateSend() {
    return this.page.getByTestId('mumble-create--send');
  }

  public get mumblePost() {
    return this.page.getByTestId('mumble-post');
  }

  public get mumblePostText() {
    return this.page.getByTestId('mumble-post--text');
  }

  public get mumbleEditText() {
    return this.page.getByTestId('mumble-edit--text');
  }

  public get mumblePostImage() {
    return this.page.getByTestId('mumble-post--image');
  }

  public get mumblePostComment() {
    return this.page.getByTestId('mumble-post--comment');
  }

  public get mumblePostLike() {
    return this.page.getByTestId('mumble-post--like');
  }

  public get mumblePostCopy() {
    return this.page.getByTestId('mumble-post--copy');
  }

  public get mumbleUserInfo() {
    return this.page.getByTestId('mumble-user-info');
  }

  public get mumblePostDelete() {
    return this.page.getByTestId('mumble-post-delete');
  }

  public get notFoundButton() {
    return this.page.getByTestId('notfound--button');
  }

  public get tagsSearchInput() {
    return this.page.getByTestId('tags-search-input');
  }
}
