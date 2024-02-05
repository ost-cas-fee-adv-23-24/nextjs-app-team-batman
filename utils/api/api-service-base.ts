import { auth } from '@/app/api/auth/[...nextauth]/auth';

export class APIServiceBase {
  public static _handleError(response: Response) {
    console.error('🔴 API ERROR: ', {
      statusText: response.statusText,
      status: response.status,
      body: response.body,
      url: response.url,
    });
    throw new APIError(response.statusText, response.status);
  }

  public static _authHeader = async (): Promise<HeadersInit> => {
    const session = await auth();
    if (!session) return {};
    return session ? { Authorization: `Bearer ${session.accessToken}` } : {};
  };

  public static _fetch = async (input: RequestInfo, init?: RequestInit) => {
    // TODO: remove before go live
    // delay for testing loading states
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const authHeader = await this._authHeader();
    const res = await fetch(input, {
      headers: {
        ...init?.headers,
        ...authHeader,
      },
      ...init,
    });
    if (!res.ok) APIServiceBase._handleError(res);
    return res;
  };

  public static _objectToFormData = (obj: Record<string, string | Blob>): FormData => {
    return Object.entries(obj).reduce((formData, [key, value]) => {
      if (value === undefined || value === null) return formData;
      if (value instanceof File && value.size === 0) return formData;

      formData.append(key, value as string);
      return formData;
    }, new FormData());
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
