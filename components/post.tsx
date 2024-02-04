import { TAPIPost } from '@/utils/api/api-types';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import {
  CommentButton,
  CopyButton,
  Image,
  Label,
  LikeButton,
} from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import NextImage from 'next/image';
import Link from 'next/link';

export default function Post({ post }: { post: TAPIPost }) {
  // TODO:  Add server actions here
  // TODO: it should work with live posts (client component)

  return (
    <div className="grid gap-m">
      <Link href={RouteService.page(PAGE_ROUTES.USER, { id: post.creator.id })}>
        <Label size="m" as={'span'}>
          {post.creator.username ?? ''}
        </Label>
      </Link>
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
}
