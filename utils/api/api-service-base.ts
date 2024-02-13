import { auth, signIn } from '@/app/api/auth/[...nextauth]/auth';

/**
 * @description Base class for API services
 * @info All API calls should be made through this class
 */
export class APIServiceBase {
  /**
   * @description Re-usable fetch method with auth header
   */
  public static _fetch = async (input: RequestInfo, init?: RequestInit) => {
    // TODO: remove this before go live ! -> just for testing loading states
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const authHeader = await this._authHeader();
    const res = await fetch(input, {
      headers: {
        ...init?.headers,
        ...authHeader,
      },
      ...init,
    });
    if (!res.ok) {
      if (res.status === 401) await signIn('zitadel');
      APIServiceBase._handleError(res);
    }
    return res;
  };

  /**
   * @description Generate auth header for API calls
   */
  public static _authHeader = async (): Promise<HeadersInit> => {
    const session = await auth();
    if (!session) return {};
    return session ? { Authorization: `Bearer ${session.accessToken}` } : {};
  };

  /**
   * @description Handle API errors
   */
  public static _handleError(response: Response) {
    console.error('🔴 API ERROR: ', {
      statusText: response.statusText,
      status: response.status,
      body: response.body,
      url: response.url,
    });
    throw new APIError(response.statusText, response.status);
  }
}

/**
 * @description Custom error class for API errors
 * @info All API errors should be thrown using this class
 */
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}
