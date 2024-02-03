const BASE_URL_API = 'https://mumble-api-prod-4cxdci3drq-oa.a.run.app';

export enum PAGE_ROUTES {
  HOME = '/',
  USER = '/user/:id',
  USER_LIKED = '/user/:id/liked',
  POSTS = '/post/:id',
}

export enum API_ROUTES {
  POSTS = '/posts',
  POSTS_ID = '/posts/:id',
  POSTS_ID_LIKES = '/posts/:id/likes',
  POSTS_ID_REPLIES = '/posts/:id/replies',
  POSTS_ID_MEDIA = '/posts/:id/media',
  USERS = '/users',
  USERS_ID = '/users/:id',
  USERS_ID_FOLLOWERS = '/users/:id/followers',
  USERS_ID_FOLLOWEES = '/users/:id/followees',
  USERS_AVATAR = '/users/avatar',
}

export class RouteService {
  public static page(route: PAGE_ROUTES, options: unknown = {}): string {
    return this._processUrl('', route, options);
  }

  public static api(route: API_ROUTES, options: unknown = {}): string {
    return this._processUrl(BASE_URL_API, route, options);
  }

  private static _processUrl(baseUrl: string, route: string, options: unknown): string {
    if (!route.startsWith('/')) {
      throw new TypeError(`Expect the first parameter to start with '/', you passed ${route}.`);
    }

    let replacedRoute: string = baseUrl + route;
    const optionsToProcess = Object.assign({}, options);

    Object.keys(optionsToProcess).forEach((key: string) => {
      if (replacedRoute.includes(`:${key}`)) {
        replacedRoute = replacedRoute.replace(
          `:${key}`,
          optionsToProcess[key as keyof typeof optionsToProcess] as string,
        );
        delete optionsToProcess[key as keyof typeof optionsToProcess];
      }
    });

    if (Object.keys(optionsToProcess).length !== 0) {
      const urlSearchParams: URLSearchParams = new URLSearchParams(optionsToProcess);
      if (replacedRoute.includes('?')) {
        replacedRoute += `&${urlSearchParams.toString()}`;
      } else {
        replacedRoute += `?${urlSearchParams.toString()}`;
      }
    }
    return replacedRoute;
  }
}

// TODO: LIVE POSTS
export enum PostEvents {
  created = 'postCreated',
  updated = 'postUpdated',
  deleted = 'postDeleted',
  liked = 'postLiked',
  unliked = 'postUnliked',
}

export function getPostEventSource() {
  return new EventSource(`${BASE_URL_API}/posts/_sse`);
}
