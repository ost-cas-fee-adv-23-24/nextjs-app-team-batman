import { MUMBLE_USER_INFO_VARIANT, MumbleUserInfo } from '@/components/mumble';
import { decodeULIDTimestamp } from '@/utils/api/api-helpers';
import { TAPIPost } from '@/utils/api/api-types';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import {
  CommentButton,
  CopyButton,
  Image,
  LikeButton,
} from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import NextImage from 'next/image';
import Link from 'next/link';

export const MumblePost = ({
  post,
  variant,
}: {
  post: TAPIPost;
  variant: MUMBLE_USER_INFO_VARIANT.DETAILVIEW | MUMBLE_USER_INFO_VARIANT.TIMELINE;
}) => {
  // TODO:  Add server actions here

  return (
    <div className="grid gap-m">
      <MumbleUserInfo
        variant={variant}
        displayname="First Name"
        userId={post.creator.id!}
        username={post.creator.username!}
        date={decodeULIDTimestamp(post.id)}
      />

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

      <div className="flex gap-l">
        <CommentButton comments={post.replies ?? 0} />
        <LikeButton likes={post.likes ?? 0} isLikedByUser={Boolean(post.likedBySelf)} />
        <CopyButton textToCopy={RouteService.page(PAGE_ROUTES.POSTS, { id: post.id })} />
      </div>
    </div>
  );
};
