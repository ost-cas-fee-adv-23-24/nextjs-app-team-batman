import { MUMBLE_POSTS_PAGINATION } from '@/app/app-config';
import PostSkeleton from '@/components/mumble/mumble-post-skeleton';

export default function Page() {
  return <PostSkeleton count={MUMBLE_POSTS_PAGINATION} />;
}
