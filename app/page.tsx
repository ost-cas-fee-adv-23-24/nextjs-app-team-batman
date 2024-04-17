import { LayoutPostWrapper } from '@/components/layout/layout-post-wrapper';
import SkeletonPost from '@/components/skeleton/skeleton-post';
import { Heading } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { Suspense } from 'react';
import DashboardCreateMumble from './_dashboard-create-mumble';
import { DashboardPosts } from './_dashboard-posts';
import { MUMBLE_POSTS_PAGINATION } from './app-config';

export default function Home() {
  return (
    <div className="grid w-full gap-l">
      <div className="grid gap-xs">
        <Heading level={1} visualLevel={2} className="text-primary-600">
          Willkommen auf Mumble
        </Heading>
        <Heading level={2} visualLevel={4} className="text-base-500">
          Meinungs-Zirkus: Trapez optional! 🎪😄💬
        </Heading>
      </div>
      <LayoutPostWrapper>
        <Suspense fallback={<SkeletonPost count={1} />}>
          <DashboardCreateMumble />
        </Suspense>
        <Suspense fallback={<SkeletonPost count={MUMBLE_POSTS_PAGINATION} />}>
          <DashboardPosts />
        </Suspense>
      </LayoutPostWrapper>
    </div>
  );
}
