'use client';
import { MUMBLE_LIKE_HANDLER } from '@/utils/api/api-actions-post';
import { MUMBLE_LIKE_TYPE, TAPIPost, TAPIReply } from '@/utils/api/api-types';
import { LikeButton } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';

export const MumbleLike = ({ post }: { post: TAPIPost | TAPIReply }) => {
  const handleLike = async () => {
    await MUMBLE_LIKE_HANDLER({ id: post.id, type: MUMBLE_LIKE_TYPE.LIKE });
  };

  const handleDisklike = async () => {
    await MUMBLE_LIKE_HANDLER({ id: post.id, type: MUMBLE_LIKE_TYPE.DISLIKE });
  };

  return (
    <LikeButton
      likes={post.likes ?? 0}
      isLikedByUser={Boolean(post.likedBySelf)}
      onLikeAdd={handleLike}
      onLikeRemove={handleDisklike}
    />
  );
};
