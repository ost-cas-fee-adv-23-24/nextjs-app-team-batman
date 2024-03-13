import { MUMBLE_POSTS_PAGINATION } from '@/app/app-config';
import { LayoutPostWrapper } from '@/components/layout/layout-post-wrapper';
import SkeletonPost from '@/components/skeleton/skeleton-post';

export default function Page() {
  return (
    <LayoutPostWrapper>
      <SkeletonPost count={MUMBLE_POSTS_PAGINATION} />
    </LayoutPostWrapper>
  );
}
