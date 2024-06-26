'use server';
import { revalidatePath } from 'next/cache';
import { API_ROUTES, PAGE_ROUTES, RouteService } from '../route-service';
import { revalidatePosts, revalidatePostsID } from './api-actions-post';
import { APIServiceBase } from './api-service-base';
import { TAPIQueryPagination, TAPIUpdateUserData, TAPIUser, TAPIUserPaginatedResult } from './api-types';
import { SCHEMA_USER } from './api-validation';

export const revalidateUser = () => {
  revalidatePath(RouteService.page(PAGE_ROUTES.USER, { id: '[id]' }), 'layout');
};

/**
 * @description Get user by id
 * @info GET-method
 */
export const GET_USER_BY_ID = async (payload: { id: string }) => {
  const res = await APIServiceBase._fetch(RouteService.api(API_ROUTES.USERS_ID, { id: payload.id }), {
    method: 'GET',
    next: { revalidate: 60 },
  });
  return (await res.json()) as TAPIUser;
};

/**
 * @description Get users followees
 * @info GET-method
 * @info query is used to paginate the followees
 */
export const GET_USER_FOLLOWEES = async (payload: { id: string; query?: TAPIQueryPagination }) => {
  const res = await APIServiceBase._fetch(
    RouteService.api(API_ROUTES.USERS_ID_FOLLOWEES, { id: payload.id }, payload?.query),
    { method: 'GET', next: { revalidate: 30 } },
  );
  return (await res.json()) as TAPIUserPaginatedResult;
};

/**
 * @description Get users followers
 * @info GET-method
 * @info query is used to paginate the followers
 */
export const GET_USER_FOLLOWERS = async (payload: { id: string; query?: TAPIQueryPagination }) => {
  const res = await APIServiceBase._fetch(
    RouteService.api(API_ROUTES.USERS_ID_FOLLOWERS, { id: payload.id }, payload?.query),
    { method: 'GET', next: { revalidate: 30 } },
  );
  return (await res.json()) as TAPIUserPaginatedResult;
};

/**
 * @description Get all users
 * @info GET-method
 * @info query is used to filter & paginate the users
 */
export const GET_USERS = async (payload?: { query?: TAPIQueryPagination }) => {
  const res = await APIServiceBase._fetch(RouteService.api(API_ROUTES.USERS, null, payload?.query), {
    method: 'GET',
    next: { revalidate: 60 },
  });
  return (await res.json()) as TAPIUserPaginatedResult;
};

/**
 * @description Remove users avatar picture
 * @info DELETE-method
 */
export const DELETE_USER_AVATAR = async (payload: { id: string }) => {
  await APIServiceBase._fetch(RouteService.api(API_ROUTES.USERS_AVATAR, { id: payload.id }), {
    method: 'DELETE',
  });

  revalidateUser();
  revalidatePosts();
  revalidatePostsID();
};

/**
 * @description Unfollow a user
 * @info DELETE-method
 */
export const DELETE_USER_FOLLOWER = async (payload: { id: string }) => {
  await APIServiceBase._fetch(RouteService.api(API_ROUTES.USERS_ID_FOLLOWERS, { id: payload.id }), {
    method: 'DELETE',
  });
  revalidateUser();
};

/**
 * @description Update a user
 * @info PATCH-method
 */
export const UPDATE_USER = async (payload: { id?: string; data: TAPIUpdateUserData }) => {
  const validation = SCHEMA_USER.safeParse(payload.data);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  await APIServiceBase._fetch(RouteService.api(API_ROUTES.USERS, { id: payload.id }), {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify(payload.data),
  });

  revalidateUser();
  revalidatePosts();
  revalidatePostsID();
};

/**
 * @description Update users avatar picture
 * @info PUT-method
 */
export const UPDATE_USER_AVATAR = async (payload: { id: string; data: FormData }) => {
  await APIServiceBase._fetch(RouteService.api(API_ROUTES.USERS_AVATAR, { id: payload.id }), {
    method: 'PUT',
    body: payload.data,
  });

  revalidateUser();
  revalidatePosts();
  revalidatePostsID();
};

/**
 * @description Follow a user
 * @info PUT-method
 */
export const UPDATE_USERS_FOLLOWERS = async (payload: { id: string }) => {
  await APIServiceBase._fetch(RouteService.api(API_ROUTES.USERS_ID_FOLLOWERS, { id: payload.id }), {
    method: 'PUT',
  });

  revalidateUser();
};

/**
 * @description Unollow a user
 * @info DELETE-method
 */
export const UPDATE_USERS_UNFOLLOW = async (payload: { id: string }) => {
  await APIServiceBase._fetch(RouteService.api(API_ROUTES.USERS_ID_FOLLOWERS, { id: payload.id }), {
    method: 'DELETE',
  });

  revalidateUser();
};
