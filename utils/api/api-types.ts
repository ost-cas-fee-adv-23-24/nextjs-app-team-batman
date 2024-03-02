// Details of the API types can be found in the API documentation
// @see https://mumble-api-prod-4cxdci3drq-oa.a.run.app/

export type TAPIUser = {
  id: string;
  username: string;
  avatarUrl: string | null;
  firstname: string | null;
  lastname: string | null;
};

export type TAPIPublicUser = {
  id: string;
  username: string;
  avatarUrl: string | null;
};

export type TAPIUserPaginatedResult = {
  count: number;
  data: TAPIUser[];
  next: string | null;
  previous: string | null;
};

export type TAPIUpdateUserData = {
  firstname: string | null;
  lastname: string | null;
  username: string | null;
};

export type TAPILikeInfo = { postId: string; userId: string | null };

export type TAPIReply = {
  id: string;
  creator: TAPIPublicUser;
  text: string | null;
  mediaUrl: string | null;
  mediaType: string | null;
  likes: number;
  likedBySelf: boolean | null;
  parentId: string;
};

export type TAPIReplyPaginatedResult = {
  count: number;
  data: TAPIReply[];
  next: string | null;
  previous: string | null;
};

export type TAPIPost = {
  id: string;
  creator: TAPIPublicUser;
  text: string | null;
  mediaUrl: string | null;
  mediaType: string | null;
  likes: number;
  likedBySelf: boolean | null;
  replies: number;
};

export type TAPIPostBase = {
  id: string;
  creator: TAPIPublicUser;
  text: string | null;
  mediaUrl: string | null;
  mediaType: string | null;
  likes: number;
  likedBySelf: boolean | null;
};

export type TAPIPostPaginatedResult = {
  count: number;
  data: TAPIPost[];
  next: string | null;
  previous: string | null;
};

export type TAPIQueryPagination = {
  offset?: number | undefined;
  limit?: number | undefined;
};

export type TAPIQueryPost = {
  newerThan?: string | undefined;
  olderThan?: string | undefined;
  text?: string | undefined;
  tags?: string[] | undefined;
  creators?: string[] | undefined;
  likedBy?: string[] | undefined;
} & TAPIQueryPagination;

export enum MUMBLE_TYPE {
  POST = 'POST',
  REPLY = 'REPLY',
}

export enum MUMBLE_LIKE_TYPE {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
}
