import { auth } from '@/app/api/auth/[...nextauth]/auth';

export class APIServiceBase {
  public static _handleError(response: Response) {
    console.error(response);
    throw new APIError(response.statusText, response.status);
  }

  public static _authHeader = async (): Promise<HeadersInit> => {
    const session = await auth();

    if (!session) {
      return {};
    }
    return { Authorization: `Bearer ${session.accessToken}` };
  };

  public static _fetch = async (input: RequestInfo, init?: RequestInit) => {
    const authHeader = await this._authHeader();
    const res = await fetch(input, {
      headers: {
        ...init?.headers,
        ...authHeader,
      },
      ...init,
    });
    if (!res.ok) {
      APIServiceBase._handleError(res);
    }
    return res;
  };
}

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}
