import { E2EPageObject } from '@/e2e/helpers/models/e2e-page-object';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { Page } from 'playwright';

export class UserPageObject extends E2EPageObject {
  public static url = RouteService.page(PAGE_ROUTES.USER);

  /* ELEMENTS */
  public static elements(page: Page) {
    return {
      heading_1: page.locator('h1'),
    };
  }

  public get elements() {
    return UserPageObject.elements(this.page);
  }
}
