'use server';
import { revalidatePath } from 'next/cache';
import { API_ROUTES, RouteService } from '../route-service';
import { APIServiceBase } from './api-service-base';
import {
  MUMBLE_TYPE,
  TAPIPost,
  TAPIPostPaginatedResult,
  TAPIQueryPagination,
  TAPIQueryPost,
  TAPIReplyPaginatedResult,
  TAPIUpdatePost,
  TAPIUpdatePostText,
} from './api-types';
import { validateCreateMumble } from './api-validation';

export const CREATE_MUMBLE = async (
  payload: { data: FormData } & ({ type: MUMBLE_TYPE.POST } | { type: MUMBLE_TYPE.REPLY; id: string }),
) => {
  const validation = validateCreateMumble(payload.data);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  if (payload.type === MUMBLE_TYPE.POST) {
    await APIServiceBase._fetch(RouteService.api(API_ROUTES.POSTS), {
      method: 'POST',
      body: payload.data,
    });
    revalidatePath(RouteService.api(API_ROUTES.POSTS));
    return;
  }
  if (payload.type === MUMBLE_TYPE.REPLY) {
    await APIServiceBase._fetch(RouteService.api(API_ROUTES.POSTS_ID_REPLIES, { id: payload.id }), {
      method: 'POST',
      body: payload.data,
    });
    revalidatePath(RouteService.api(API_ROUTES.POSTS_ID_REPLIES, { id: payload.id }));
    return;
  }
  throw new Error('Invalid mumble type');
};

export const CREATE_POST_LIKE = async (payload: { id: string }) => {
  await APIServiceBase._fetch(RouteService.api(API_ROUTES.POSTS_ID_LIKES, { id: payload.id }), {
    method: 'PUT',
  });
};

export const DELETE_POST = async (payload: { id: string }) => {
  await APIServiceBase._fetch(RouteService.api(API_ROUTES.POSTS_ID, { id: payload.id }), {
    method: 'DELETE',
  });
};

export const DELETE_POST_LIKE = async (payload: { id: string }) => {
  await APIServiceBase._fetch(RouteService.api(API_ROUTES.POSTS_ID_LIKES, { id: payload.id }), {
    method: 'DELETE',
  });
};

export const GET_POST_BY_ID = async (payload: { id: string }) => {
  const res = await APIServiceBase._fetch(RouteService.api(API_ROUTES.POSTS_ID, { id: payload.id }), {});
  return (await res.json()) as TAPIPost;
};

export const GET_POSTS = async (payload?: { query?: TAPIQueryPost }) => {
  const res = await APIServiceBase._fetch(RouteService.api(API_ROUTES.POSTS, null, payload?.query));
  return (await res.json()) as TAPIPostPaginatedResult;
};

export const GET_POST_REPLIES = async (payload: { id: string; query?: TAPIQueryPagination }) => {
  const res = await APIServiceBase._fetch(
    RouteService.api(API_ROUTES.POSTS_ID_REPLIES, { id: payload.id }, payload?.query),
    { method: 'GET' },
  );
  return (await res.json()) as TAPIReplyPaginatedResult;
};

// TODO: do it like CREATE_MUMBLE
export const UPDATE_POST = async (payload: { id: string; data: TAPIUpdatePost }) => {
  const res = await APIServiceBase._fetch(RouteService.api(API_ROUTES.POSTS_ID, { id: payload.id }), {
    method: 'PUT',
    body: APIServiceBase._objectToFormData(payload.data),
  });
  return (await res.json()) as TAPIPost;
};

// TODO: do it like CREATE_MUMBLE
export const UPDATE_POST_TEXT = async (payload: { id: string } & TAPIUpdatePostText) => {
  const body = {
    text: payload.text,
  };
  await APIServiceBase._fetch(RouteService.api(API_ROUTES.USERS, { id: payload.id }), {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
};
