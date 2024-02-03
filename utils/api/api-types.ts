export type TUser = {
  id: string | null;
  username: string | null;
  avatarUrl: string | null;
  firstname: string | null;
  lastname: string | null;
};

export type TPublicUser = {
  id: string | null;
  username: string | null;
  avatarUrl: string | null;
};

export type TUserPaginatedResult = {
  count: number;
  data: TUser[];
  next: string | null;
  previous: string | null;
};

export type TUpdateUserData = {
  firstname: string | null;
  lastname: string | null;
  username: string | null;
};

export type TLikeInfo = { postId: string; userId: string | null };

export type TReply = {
  id: string;
  creator: TPublicUser;
  text: string | null;
  mediaUrl: string | null;
  mediaType: string | null;
  likes: number;
  likedBySelf: boolean | null;
  parentId: string;
};

export type TReplyPaginatedResult = {
  count: number;
  data: TReply[];
  next: string | null;
  previous: string | null;
};

export type TPost = {
  id: string;
  creator: TPublicUser;
  text: string | null;
  mediaUrl: string | null;
  mediaType: string | null;
  likes: number;
  likedBySelf: boolean | null;
  replies: number;
};

export type TPostBase = {
  id: string;
  creator: TPublicUser;
  text: string | null;
  mediaUrl: string | null;
  mediaType: string | null;
  likes: number;
  likedBySelf: boolean | null;
};

export type TPostPaginatedResult = {
  count: number;
  data: TPost[];
  next: string | null;
  previous: string | null;
};

export type TDeletedPost = { id: string };
export type TUpdatePostData = { text: string | null };

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
