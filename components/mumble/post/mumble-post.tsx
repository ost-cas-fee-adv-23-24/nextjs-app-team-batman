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
    <div className="grid gap-s sm:gap-m">
      <div className="flex">
        <div onClick={(e) => e.stopPropagation()}>
          <MumbleUserInfo variant={variant} user={post.creator} postDate={decodeULIDTimestamp(post.id)} />
        </div>
      </div>
      {isDetailView && <MumblePostDelete post={post} />}

      {post.text && <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: post.text }} />}

      {post.mediaUrl && (
        <div className="grid cursor-auto place-content-center object-contain" onClick={(e) => e.stopPropagation()}>
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
          />
        </div>
      )}

      <div className="flex">
        <div className="-ml-xs flex flex-wrap gap-xxs gap-y-0 sm:gap-l" onClick={(e) => e.stopPropagation()}>
          {!isReply && !isDetailView && session && (
            <CommentButton
              comments={(post as TAPIPost).replies ?? 0}
              onClick={() => router.push(RouteService.page(PAGE_ROUTES.POSTS, { id: post.id }))}
            />
          )}

          {session && (
            <LikeButton
              likes={post.likes ?? 0}
              isLikedByUser={Boolean(post.likedBySelf)}
              onLikeAdd={handleLike}
              onLikeRemove={handleDisklike}
            />
          )}

          {!isReply && <CopyButton textToCopy={textToCopy} text={['Copy Link', 'Link kopiert']} />}
        </div>
      </div>
    </div>
  );
};
