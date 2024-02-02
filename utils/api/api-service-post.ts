'use server';
import { API_ROUTES, RouteService } from '../route-service';
import { APIServiceBase } from './api-service-base';
import { API_SCHEMAS, TPayloadCreatePost, TPost, TPostPaginatedResult } from './schema';

export const GET_POST_BY_ID = async (payload: { id: string }) => {
  const res = await APIServiceBase._fetch(RouteService.route_api(API_ROUTES.POSTS_ID, { id: payload.id }), {});
  const posts = (await res.json()) as TPost;
  const parsedPosts = API_SCHEMAS.Post.parse(posts);
  return parsedPosts;
};

export const DELETE_POST = async (payload: { id: string }) => {
  await APIServiceBase._fetch(RouteService.route_api(API_ROUTES.POSTS_ID, { id: payload.id }), {
    method: 'DELETE',
  });
};

export const GET_POSTS = async () => {
  const res = await APIServiceBase._fetch(RouteService.route_api(API_ROUTES.POSTS));
  const posts = (await res.json()) as TPostPaginatedResult;
  return posts;
};

export const CREATE_POST = async (payload: TPayloadCreatePost) => {
  const body = new FormData();
  body.append('text', payload.text ?? '');
  if (payload.media?.size ?? 0 > 0) {
    body.append('media', payload.media ?? '');
  }
  const res = await APIServiceBase._fetch(RouteService.route_api(API_ROUTES.POSTS), {
    method: 'POST',
    body,
  });
  const post = (await res.json()) as TPost;
  return post;
};

export const UPDATE_POST = async (payload: { id: string }) => {
  const body = new FormData();
  body.append('id', payload.id ?? '');
  const res = await APIServiceBase._fetch(RouteService.route_api(API_ROUTES.POSTS_ID, { id: payload.id }), {
    method: 'PUT',
    body,
  });
  const posts = (await res.json()) as TPost;
  return posts;
};

export const LIKE_POST = async (payload: { id: string }) => {
  await APIServiceBase._fetch(RouteService.route_api(API_ROUTES.POSTS_ID_LIKES, { id: payload.id }), {
    method: 'PUT',
  });
};

export const UNLIKE_POST = async (payload: { id: string }) => {
  await APIServiceBase._fetch(RouteService.route_api(API_ROUTES.POSTS_ID_LIKES, { id: payload.id }), {
    method: 'DELETE',
  });
};

export const GET_POST_REPLIES = async (payload: { id: string }) => {
  const res = await APIServiceBase._fetch(RouteService.route_api(API_ROUTES.POSTS_ID_REPLIES, { id: payload.id }), {
    method: 'GET',
  });

  const replies = (await res.json()) as TPostPaginatedResult;
  return replies;
};

export const CREATE_POST_REPLIES = async (payload: { id: string } & TPayloadCreatePost) => {
  const body = new FormData();
  body.append('text', payload.text ?? '');
  if (payload.media?.size ?? 0 > 0) {
    body.append('media', payload.media ?? '');
  }

  await APIServiceBase._fetch(RouteService.route_api(API_ROUTES.POSTS_ID_REPLIES, { id: payload.id }), {
    method: 'POST',
    body,
  });
};
