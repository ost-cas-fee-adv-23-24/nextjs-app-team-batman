import { MUMBLE_USER_INFO_VARIANT, MumbleUserInfo } from '@/components/mumble';
import { decodeULIDTimestamp } from '@/utils/api/api-helpers';
import { TAPIReply } from '@/utils/api/api-types';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { CopyButton, Image, LikeButton } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import NextImage from 'next/image';

export const MumbleReply = ({ post }: { post: TAPIReply }) => {
  // TODO:  Add server actions

  return (
    <div className="grid gap-s">
      <MumbleUserInfo
        variant={MUMBLE_USER_INFO_VARIANT.REPLY}
        displayname="First Name"
        userId={post.creator.id!}
        username={post.creator.username!}
        imageSrc={post.creator.avatarUrl ?? undefined}
        date={decodeULIDTimestamp(post.id)}
      />

      <p>{post.text}</p>

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
        <LikeButton likes={post.likes ?? 0} isLikedByUser={Boolean(post.likedBySelf)} />
        <CopyButton textToCopy={RouteService.page(PAGE_ROUTES.POSTS, { id: post.id })} />
      </div>
    </div>
  );
};
