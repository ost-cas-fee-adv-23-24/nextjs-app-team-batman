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

  public static _objectToFormData = (obj: Record<string, string | Blob>): FormData => {
    return Object.entries(obj).reduce((formData, [key, value]) => {
      if (value === undefined || value === null) {
        return formData;
      }
      if (value instanceof File && value.size === 0) {
        return formData;
      }
      formData.append(key, value as string);
      return formData;
    }, new FormData());
  };

  public static _objectToQuery(obj: Record<string, string | string[] | number | undefined> | undefined): string | null {
    if (obj && Object.keys(obj).length > 0) {
      const query = Object.entries(obj).reduce((acc, [key, value]) => {
        if (value === undefined || value === null) {
          return acc;
        }
        if (Array.isArray(value)) {
          const arrayParams = value.map((item) => `${key}=${encodeURIComponent(String(item))}`);
          return acc ? `${acc}&${arrayParams.join('&')}` : `?${arrayParams.join('&')}`;
        }
        return acc
          ? `${acc}&${key}=${encodeURIComponent(String(value))}`
          : `?${key}=${encodeURIComponent(String(value))}`;
      }, '');

      return query || null;
    }

    return null;
  }
}

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}
