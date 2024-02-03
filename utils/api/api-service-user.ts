'use server';
import { API_ROUTES, RouteService } from '../route-service';
import { APIServiceBase } from './api-service-base';
import { TAPIQueryPagination, TUpdateUserData, TUser, TUserPaginatedResult } from './api-types';

export const DELETE_USER_AVATAR = async (payload: { id: string }) => {
  await APIServiceBase._fetch(RouteService.api(API_ROUTES.USERS_AVATAR, { id: payload.id }), {
    method: 'DELETE',
  });
};

export const DELETE_USER_FOLLOWER = async (payload: { id: string }) => {
  await APIServiceBase._fetch(RouteService.api(API_ROUTES.USERS_AVATAR, { id: payload.id }), {
    method: 'DELETE',
  });
};

export const GET_USER_BY_ID = async (payload: { id: string }) => {
  const res = await APIServiceBase._fetch(RouteService.api(API_ROUTES.USERS_ID, { id: payload.id }), {
    method: 'GET',
  });
  return (await res.json()) as TUser;
};

export const GET_USER_FOLLOWEES = async (payload: { id: string; query?: TAPIQueryPagination }) => {
  const query = APIServiceBase._objectToQuery(payload?.query);
  const res = await APIServiceBase._fetch(
    RouteService.api(API_ROUTES.USERS_ID_FOLLOWEES, { id: payload.id }) + (query ?? ''),
    {
      method: 'GET',
    },
  );
  return (await res.json()) as TUserPaginatedResult;
};

export const GET_USER_FOLLOWERS = async (payload: { id: string; query?: TAPIQueryPagination }) => {
  const query = APIServiceBase._objectToQuery(payload?.query);
  const res = await APIServiceBase._fetch(
    RouteService.api(API_ROUTES.USERS_ID_FOLLOWERS, { id: payload.id }) + (query ?? ''),
    {
      method: 'GET',
    },
  );
  return (await res.json()) as TUserPaginatedResult;
};

export const GET_USERS = async (payload?: { query?: TAPIQueryPagination }) => {
  const query = APIServiceBase._objectToQuery(payload?.query);
  const res = await APIServiceBase._fetch(RouteService.api(API_ROUTES.USERS) + (query ?? ''), {
    method: 'GET',
  });
  return (await res.json()) as TUserPaginatedResult;
};

export const UPDATE_USER = async (payload: { id: string; data: TUpdateUserData }) => {
  await APIServiceBase._fetch(RouteService.api(API_ROUTES.USERS, { id: payload.id }), {
    method: 'PATCH',
    body: JSON.stringify(payload.data),
  });
};

export const UPDATE_USER_AVATAR = async (payload: { id: string; data: { media: File } }) => {
  await APIServiceBase._fetch(RouteService.api(API_ROUTES.USERS_AVATAR, { id: payload.id }), {
    method: 'PUT',
    body: APIServiceBase._objectToFormData(payload.data),
  });
};

export const UPDATE_USERS_FOLLOWERS = async (payload: { id: string }) => {
  await APIServiceBase._fetch(RouteService.api(API_ROUTES.USERS_ID_FOLLOWERS, { id: payload.id }), {
    method: 'PUT',
  });
};
