import { TAPIReply } from '@/utils/api/api-types';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import {
  CopyButton,
  Image,
  Label,
  LikeButton,
} from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import NextImage from 'next/image';
import Link from 'next/link';

export default function Reply({ post }: { post: TAPIReply }) {
  // TODO:  Add server actions here
  // TODO: it should work with live posts (client component)

  return (
    <div className="grid gap-m">
      <Link href={RouteService.page(PAGE_ROUTES.USER, { id: post.creator.id })}>
        <Label size="m" as={'span'}>
          {post.creator.username ?? ''}
        </Label>
      </Link>
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
}
