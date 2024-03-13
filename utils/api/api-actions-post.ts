'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { MUMBLE_LIKE_TYPE, MUMBLE_TYPE } from '../enums';
import { API_ROUTES, PAGE_ROUTES, RouteService } from '../route-service';
import { APIServiceBase } from './api-service-base';
import {
  TAPIPost,
  TAPIPostPaginatedResult,
  TAPIQueryPagination,
  TAPIQueryPost,
  TAPIReplyPaginatedResult,
} from './api-types';
import { validateMumble } from './api-validation';

/**
 * @description Create a new mumble (post or reply)
 * @info POST-method is used for both post and reply
 * @info For reply, parentId is required
 * @info revalidatePath is used to update the cache
 */
export const CREATE_MUMBLE = async (
  payload: { data: FormData } & ({ type: MUMBLE_TYPE.POST } | { type: MUMBLE_TYPE.REPLY; parentId: string }),
) => {
  const validation = validateMumble(payload.data);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  switch (payload.type) {
    case MUMBLE_TYPE.POST:
      await APIServiceBase._fetch(RouteService.api(API_ROUTES.POSTS), {
        method: 'POST',
        body: payload.data,
      });
      revalidatePath(RouteService.api(API_ROUTES.POSTS));
      break;
    case MUMBLE_TYPE.REPLY:
      await APIServiceBase._fetch(RouteService.api(API_ROUTES.POSTS_ID_REPLIES, { id: payload.parentId }), {
        method: 'POST',
        body: payload.data,
      });
      revalidatePath(RouteService.api(API_ROUTES.POSTS_ID_REPLIES, { id: payload.parentId }));
      break;
    default:
      throw new Error('Invalid mumble type');
  }
};

/**
 * @description Update a mumble
 * @info PUT-method is used when media & text is updated
 * @info PATCH-method is used when only text is updated
 * @info revalidatePath is used to update the cache
 */
export const UPDATE_MUMBLE = async (payload: { id: string; data: FormData }) => {
  const validation = validateMumble(payload.data);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  if (validation.data.media) {
    await APIServiceBase._fetch(RouteService.api(API_ROUTES.POSTS_ID, { id: payload.id }), {
      method: 'PUT',
      body: payload.data,
    });
  } else {
    await APIServiceBase._fetch(RouteService.api(API_ROUTES.POSTS_ID, { id: payload.id }), {
      method: 'PATCH',
      body: JSON.stringify(validation.data),
    });
  }

  revalidatePath(RouteService.api(API_ROUTES.POSTS_ID, { id: payload.id }));
};

/**
 * @description Like or dislike a mumble
 * @info PUT-method is used for like
 * @info DELETE-method is used for dislike
 * @info revalidatePath is used to update the cache
 */
export const MUMBLE_LIKE_HANDLER = async (payload: { id: string; type: MUMBLE_LIKE_TYPE }) => {
  switch (payload.type) {
    case MUMBLE_LIKE_TYPE.LIKE:
      await APIServiceBase._fetch(RouteService.api(API_ROUTES.POSTS_ID_LIKES, { id: payload.id }), {
        method: 'PUT',
      });
      break;
    case MUMBLE_LIKE_TYPE.DISLIKE:
      await APIServiceBase._fetch(RouteService.api(API_ROUTES.POSTS_ID_LIKES, { id: payload.id }), {
        method: 'DELETE',
      });
      break;
    default:
      throw new Error('Invalid mumble like type');
  }

  revalidatePath(RouteService.api(API_ROUTES.POSTS_ID, { id: payload.id }));
};

/**
 * @description Delete a mumble
 * @info DELETE-method
 */
export const DELETE_POST = async (payload: { id: string }) => {
  await APIServiceBase._fetch(RouteService.api(API_ROUTES.POSTS_ID, { id: payload.id }), {
    method: 'DELETE',
  });
  redirect(RouteService.page(PAGE_ROUTES.HOME));
};

/**
 * @description Get a mumble by id
 * @info GET-method
 */
export const GET_POST_BY_ID = async (payload: { id: string }) => {
  const res = await APIServiceBase._fetch(RouteService.api(API_ROUTES.POSTS_ID, { id: payload.id }), {});
  return (await res.json()) as TAPIPost;
};

/**
 * @description Get mumbles
 * @info GET-method
 * @info query is used to filter & paginate the mumbles
 */
export const GET_POSTS = async (payload?: { query?: TAPIQueryPost }) => {
  const res = await APIServiceBase._fetch(RouteService.api(API_ROUTES.POSTS, null, payload?.query));
  return (await res.json()) as TAPIPostPaginatedResult;
};

/**
 * @description Get mumbles replies
 * @info GET-method
 * @info query is used to paginate the replies
 */
export const GET_POST_REPLIES = async (payload: { id: string; query?: TAPIQueryPagination }) => {
  const res = await APIServiceBase._fetch(
    RouteService.api(API_ROUTES.POSTS_ID_REPLIES, { id: payload.id }, payload?.query),
    { method: 'GET' },
  );
  return (await res.json()) as TAPIReplyPaginatedResult;
};
