import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { MUMBLE_USER_INFO_VARIANT, MumbleUserInfo } from '@/components/mumble';
import { decodeULIDTimestamp } from '@/utils/api/api-helpers';
import { TAPIPost } from '@/utils/api/api-types';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { CommentButton, Image } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import NextImage from 'next/image';
import Link from 'next/link';
import { MumbleCopy } from './mumble-copy';
import { MumbleDelete } from './mumble-delete';
import { MumbleLike } from './mumble-like';

export const MumblePost = async ({
  post,
  variant,
}: {
  post: TAPIPost;
  variant: MUMBLE_USER_INFO_VARIANT.DETAILVIEW | MUMBLE_USER_INFO_VARIANT.TIMELINE;
}) => {
  const session = await auth();

  return (
    <div className="grid gap-m">
      <MumbleUserInfo
        variant={variant}
        displayname="First Name"
        userId={post.creator.id!}
        username={post.creator.username!}
        date={decodeULIDTimestamp(post.id)}
      />
      {session && variant === MUMBLE_USER_INFO_VARIANT.DETAILVIEW && session.user?.id === post.creator.id && (
        <MumbleDelete post={post} />
      )}

      <Link href={RouteService.page(PAGE_ROUTES.POSTS, { id: post.id })}>
        <p>{post.text}</p>
      </Link>

      {post.mediaUrl && (
        <div className="grid place-content-center">
          <Image
            as={NextImage}
            src={post.mediaUrl}
            alt={'post image'}
            width="400"
            height="200"
            zoom="in"
            clickToPreview
            rounded="s"
          />
        </div>
      )}

      <div className="-ml-xs flex flex-wrap gap-xxs gap-y-0 sm:gap-l">
        <Link href={RouteService.page(PAGE_ROUTES.POSTS, { id: post.id })}>
          <CommentButton comments={post.replies ?? 0} />
        </Link>
        <MumbleLike post={post} />
        <MumbleCopy post={post} />
      </div>
    </div>
  );
};
