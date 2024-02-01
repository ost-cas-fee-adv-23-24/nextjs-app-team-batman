import { TPost } from '@/utils/api/schema';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import {
  CommentButton,
  CopyButton,
  Image,
  Label,
  LikeButton,
} from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import NextImage from 'next/image';

export default function Post({ post }: { post: TPost }) {
  return (
    <div className="grid gap-m">
      <Label size="m" as={'span'}>
        {post.creator.username ?? ''}
      </Label>
      <a href={RouteService.route_page(PAGE_ROUTES.POSTS, { id: post.id })}>
        <p>{post.text}</p>
      </a>

      {post.mediaUrl && (
        <div className="grid place-content-center">
          <Image as={NextImage} src={post.mediaUrl} alt={''} width={'400'} height="200" clickToPreview rounded="s" />
        </div>
      )}

      <div className="flex gap-l">
        <CommentButton comments={post.replies ?? 0} />
        <LikeButton likes={post.likes ?? 0} isLikedByUser={Boolean(post.likedBySelf)} />
        <CopyButton textToCopy={RouteService.route_page(PAGE_ROUTES.POSTS, { id: post.id })} />
      </div>
    </div>
  );
}
