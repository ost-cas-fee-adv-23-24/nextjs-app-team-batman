'use server';
import { API_ROUTES, RouteService } from '../route-service';
import { APIServiceBase } from './api-service-base';
import { TAPIQueryPagination, TAPIUpdateUserData, TAPIUser, TAPIUserPaginatedResult } from './api-types';

/**
 * @description Remove users avatar picture
 * @info DELETE-method
 */
export const DELETE_USER_AVATAR = async (payload: { id: string }) => {
  await APIServiceBase._fetch(RouteService.api(API_ROUTES.USERS_AVATAR, { id: payload.id }), {
    method: 'DELETE',
  });
};

/**
 * @description Unfollow a user
 * @info DELETE-method
 */
export const DELETE_USER_FOLLOWER = async (payload: { id: string }) => {
  await APIServiceBase._fetch(RouteService.api(API_ROUTES.USERS_ID_FOLLOWERS, { id: payload.id }), {
    method: 'DELETE',
  });
};

/**
 * @description Get user by id
 * @info GET-method
 */
export const GET_USER_BY_ID = async (payload: { id: string }) => {
  const res = await APIServiceBase._fetch(RouteService.api(API_ROUTES.USERS_ID, { id: payload.id }), {
    method: 'GET',
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
    { method: 'GET' },
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
    { method: 'GET' },
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
  });
  return (await res.json()) as TAPIUserPaginatedResult;
};

/**
 * @description Update a user
 * @info PATCH-method
 */
export const UPDATE_USER = async (payload: { id: string; data: TAPIUpdateUserData }) => {
  await APIServiceBase._fetch(RouteService.api(API_ROUTES.USERS, { id: payload.id }), {
    method: 'PATCH',
    body: JSON.stringify(payload.data),
  });
};

/**
 * @description Update users avatar picture
 * @info PUT-method
 */
export const UPDATE_USER_AVATAR = async (payload: { id: string; data: FormData }) => {
  await APIServiceBase._fetch(RouteService.api(API_ROUTES.USERS_AVATAR, { id: payload.id }), {
    method: 'PUT',
    body: payload.data,
    /* ToDo add file validation and errors */
  });
};

/**
 * @description Follow a user
 * @info PUT-method
 */
export const UPDATE_USERS_FOLLOWERS = async (payload: { id: string }) => {
  await APIServiceBase._fetch(RouteService.api(API_ROUTES.USERS_ID_FOLLOWERS, { id: payload.id }), {
    method: 'PUT',
  });
};
