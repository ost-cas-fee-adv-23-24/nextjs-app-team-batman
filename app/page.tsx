import SkeletonPost from '@/components/skeleton/skeleton-post';
import { Heading } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { Suspense } from 'react';
import { MUMBLE_POSTS_PAGINATION } from './app-config';
import DashboardCreateMumble from './dashboard-create-mumble';
import { DashboardPosts } from './dashboard-posts';

export default function Home() {
  return (
    <div className="grid gap-l">
      <div className="grid gap-xs">
        <Heading level={1} visualLevel={2} className="text-primary-600">
          Willkommen auf Mumble
        </Heading>
        <Heading level={4} className="text-base-500">
          Voluptatem qui cumque voluptatem quia tempora dolores distinctio vel repellat dicta.
        </Heading>
      </div>
      <div className="grid gap-s">
        <Suspense fallback={<SkeletonPost count={1} />}>
          <DashboardCreateMumble />
        </Suspense>
        <Suspense fallback={<SkeletonPost count={MUMBLE_POSTS_PAGINATION} />}>
          <DashboardPosts />
        </Suspense>
      </div>
    </div>
  );
}
