import { Card } from '@/components/card/card';
import { NewMumblePost, POST_TYPE } from '@/components/new-mumble-post';
import { Heading } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { Suspense } from 'react';
import { auth } from './api/auth/[...nextauth]/auth';
import DashboardPosts from './dashboard-posts';

export default async function Home() {
  const session = await auth();

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
        {session && (
          <Card>
            <NewMumblePost type={POST_TYPE.MUMBLE} />
          </Card>
        )}

        <Suspense fallback={<p>LOADING POSTS...</p>}>
          <DashboardPosts />
        </Suspense>
      </div>
    </div>
  );
}
