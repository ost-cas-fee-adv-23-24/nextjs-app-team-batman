import { MUMBLE_POSTS_PAGINATION } from '@/app/app-config';
import SkeletonPost from '@/components/skeleton/skeleton-post';

export default function Page() {
  return <SkeletonPost count={MUMBLE_POSTS_PAGINATION} />;
}
