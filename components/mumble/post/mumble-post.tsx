'use client';
import { MUMBLE_LIKE_HANDLER } from '@/utils/api/api-actions-post';
import { decodeULIDTimestamp } from '@/utils/api/api-helpers';
import { TAPIPost, TAPIReply } from '@/utils/api/api-types';
import { MUMBLE_LIKE_TYPE, MUMBLE_VARIANT } from '@/utils/enums';
import { tagReplacement } from '@/utils/helpers/tags-replacement';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import {
  CommentButton,
  CopyButton,
  Image,
  LikeButton,
} from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { useSession } from 'next-auth/react';
import NextImage from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MumbleUserInfo } from '../user/mumble-user-info';
import { MumblePostDelete } from './mumble-post-delete';
import { MumblePostEdit } from './mumble-post-edit';

export const MumblePost = ({ post, variant }: { post: TAPIPost | TAPIReply; variant: MUMBLE_VARIANT }) => {
  const { data } = useSession();
  const router = useRouter();
  const [textToCopy, setTextToCopy] = useState<string>('');

  const session = Boolean(data?.user);

  const isReply = variant === MUMBLE_VARIANT.REPLY;
  const isDetailView = variant === MUMBLE_VARIANT.DETAILVIEW;

  useEffect(() => {
    setTextToCopy(window.location.origin + RouteService.page(PAGE_ROUTES.POSTS, { id: post.id }));
  }, [post]);

  const handleLike = async () => {
    await MUMBLE_LIKE_HANDLER({ id: post.id, type: MUMBLE_LIKE_TYPE.LIKE });
  };

  const handleDisklike = async () => {
    await MUMBLE_LIKE_HANDLER({ id: post.id, type: MUMBLE_LIKE_TYPE.DISLIKE });
  };

  return (
    <div className="grid gap-s sm:gap-m" data-testid="mumble-post">
      <div className="flex">
        <MumbleUserInfo variant={variant} user={post.creator} postDate={decodeULIDTimestamp(post.id)} />
      </div>
      (
      <div className="flex justify-start gap-s">
        <MumblePostEdit post={post} />
        <MumblePostDelete post={post} goHome={variant === MUMBLE_VARIANT.DETAILVIEW} />
      </div>
      )
      {post.text && (
        <div
          data-testid="mumble-post--text"
          className="cursor-auto whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: tagReplacement(post.text)! }}
        />
      )}
      {post.mediaUrl && (
        <div className="grid cursor-auto place-content-center object-contain" data-testid="mumble-post--image">
          <Image
            as={NextImage}
            src={post.mediaUrl}
            alt={'post image'}
            width="400"
            height="200"
            zoom="in"
            clickToPreview
            rounded="s"
            imagePlacing="cover"
            className="h-[150px] sm:h-[350px]"
          />
        </div>
      )}
      <div className="flex">
        <div className="-ml-xs flex flex-wrap gap-xxs gap-y-0 sm:gap-l" onClick={(e) => e.stopPropagation()}>
          {!isReply && !isDetailView && (
            <CommentButton
              comments={(post as TAPIPost).replies ?? 0}
              onClick={() => router.push(RouteService.page(PAGE_ROUTES.POSTS, { id: post.id }))}
              data-testid="mumble-post--comment"
            />
          )}

          <LikeButton
            likes={post.likes ?? 0}
            isLikedByUser={Boolean(post.likedBySelf)}
            onLikeAdd={handleLike}
            onLikeRemove={handleDisklike}
            data-testid="mumble-post--like"
            data-like-count={post.likes}
            disabled={!session}
          />

          {!isReply && (
            <CopyButton textToCopy={textToCopy} text={['Copy Link', 'Link kopiert']} data-testid="mumble-post--copy" />
          )}
        </div>
      </div>
    </div>
  );
};
