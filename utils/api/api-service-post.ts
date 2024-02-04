'use server';
import { API_ROUTES, RouteService } from '../route-service';
import { APIServiceBase } from './api-service-base';
import {
  TAPIPost,
  TAPIPostPaginatedResult,
  TAPIQueryPagination,
  TAPIQueryPost,
  TAPIReplyPaginatedResult,
  TAPIUpdatePost,
  TAPIUpdatePostText,
} from './api-types';

export const CREATE_POST = async (payload: { data: TAPIUpdatePost }) => {
  const res = await APIServiceBase._fetch(RouteService.api(API_ROUTES.POSTS), {
    method: 'POST',
    body: APIServiceBase._objectToFormData(payload.data),
  });
  return (await res.json()) as TAPIPost;
};

export const CREATE_POST_LIKE = async (payload: { id: string }) => {
  await APIServiceBase._fetch(RouteService.api(API_ROUTES.POSTS_ID_LIKES, { id: payload.id }), {
    method: 'PUT',
  });
};

export const CREATE_POST_REPLIES = async (payload: { id: string; data: TAPIUpdatePost }) => {
  await APIServiceBase._fetch(RouteService.api(API_ROUTES.POSTS_ID_REPLIES, { id: payload.id }), {
    method: 'POST',
    body: APIServiceBase._objectToFormData(payload.data),
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

export const UPDATE_POST = async (payload: { id: string; data: TAPIUpdatePost }) => {
  const res = await APIServiceBase._fetch(RouteService.api(API_ROUTES.POSTS_ID, { id: payload.id }), {
    method: 'PUT',
    body: APIServiceBase._objectToFormData(payload.data),
  });
  return (await res.json()) as TAPIPost;
};

export const UPDATE_POST_TEXT = async (payload: { id: string } & TAPIUpdatePostText) => {
  const body = {
    text: payload.text,
  };
  await APIServiceBase._fetch(RouteService.api(API_ROUTES.USERS, { id: payload.id }), {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
};
