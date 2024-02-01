import { z } from 'zod';

const User = z.object({
  id: z.string().nullable(),
  username: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  firstname: z.string().nullable(),
  lastname: z.string().nullable(),
});

const PublicUser = z.object({
  id: z.string().nullable(),
  username: z.string().nullable(),
  avatarUrl: z.string().nullable(),
});

const UserPaginatedResult = z.object({
  count: z.number().int(),
  data: z.array(User),
  next: z.string().nullable(),
  previous: z.string().nullable(),
});

const UpdateUserData = z.object({
  firstname: z.string().nullable(),
  lastname: z.string().nullable(),
  username: z.string().nullable(),
});

const LikeInfo = z.object({ postId: z.string(), userId: z.string().nullable() });

const Reply = z.object({
  id: z.string().ulid(),
  creator: PublicUser,
  text: z.string().nullable(),
  mediaUrl: z.string().nullable(),
  mediaType: z.string().nullable(),
  likes: z.number().int(),
  likedBySelf: z.boolean().nullable(),
  parentId: z.string().ulid(),
});

const ReplyPaginatedResult = z.object({
  count: z.number().int(),
  data: z.array(Reply),
  next: z.string().nullable(),
  previous: z.string().nullable(),
});

const Post = z.object({
  id: z.string().ulid(),
  creator: PublicUser,
  text: z.string().nullable(),
  mediaUrl: z.string().nullable(),
  mediaType: z.string().nullable(),
  likes: z.number().int(),
  likedBySelf: z.boolean().nullable(),
  replies: z.number().int(),
});

const PostBase = z.object({
  id: z.string().ulid(),
  creator: PublicUser,
  text: z.string().nullable(),
  mediaUrl: z.string().nullable(),
  mediaType: z.string().nullable(),
  likes: z.number().int(),
  likedBySelf: z.boolean().nullable(),
});

const PostPaginatedResult = z.object({
  count: z.number().int(),
  data: z.array(Post),
  next: z.string().nullable(),
  previous: z.string().nullable(),
});

const DeletedPost = z.object({ id: z.string().ulid() });
const UpdatePostData = z.object({ text: z.string().nullable() });

const PayloadCreatePost = z.object({ text: z.string(), media: z.instanceof(File) }).partial();

export const API_SCHEMAS = {
  DeletedPost,
  LikeInfo,
  Post,
  PostBase,
  PostPaginatedResult,
  PublicUser,
  Reply,
  ReplyPaginatedResult,
  UpdatePostData,
  UpdateUserData,
  User,
  UserPaginatedResult,

  PayloadCreatePost,
};

export type TPublicUser = z.infer<typeof PublicUser>;
export type TPost = z.infer<typeof Post>;
export type TPostPaginatedResult = z.infer<typeof PostPaginatedResult>;
export type TUpdatePostData = z.infer<typeof UpdatePostData>;
export type TReply = z.infer<typeof Reply>;
export type TReplyPaginatedResult = z.infer<typeof ReplyPaginatedResult>;
export type TUser = z.infer<typeof User>;
export type TUserPaginatedResult = z.infer<typeof UserPaginatedResult>;
export type TUpdateUserData = z.infer<typeof UpdateUserData>;
export type TPostBase = z.infer<typeof PostBase>;
export type TDeletedPost = z.infer<typeof DeletedPost>;
export type TLikeInfo = z.infer<typeof LikeInfo>;

export type TPayloadCreatePost = z.infer<typeof PayloadCreatePost>;
