import { decodeULIDTimestamp } from '@/utils/api/api-helpers';
import { TAPIReply } from '@/utils/api/api-types';
import { Image } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import NextImage from 'next/image';
import { MumbleLike } from './mumble-like';
import { MUMBLE_USER_INFO_VARIANT, MumbleUserInfo } from './mumble-user-info';

export const MumbleReply = ({ post }: { post: TAPIReply }) => {
  return (
    <div className="grid gap-s">
      <MumbleUserInfo
        variant={MUMBLE_USER_INFO_VARIANT.REPLY}
        user={post.creator}
        postDate={decodeULIDTimestamp(post.id)}
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

      <div className="-ml-xs">
        <MumbleLike post={post} />
      </div>
    </div>
  );
};
