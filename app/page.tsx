import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { DashboardPosts } from '@/components/dashboard';
import { MumbleCreate } from '@/components/mumble';
import { MumbleCard } from '@/components/mumble/mumble-card';
import { MUMBLE_TYPE } from '@/utils/api/api-types';
import { Heading } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { Suspense } from 'react';
import { userAvatar } from '@/utils/user-avatar';
import PostSkeleton from '@/components/mumble/mumble-post-skeleton';

export default async function Home() {
  const session = await auth();
  const avatar = await userAvatar(session?.user?.id);

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
          <MumbleCard imageSrc={avatar}>
            <MumbleCreate type={MUMBLE_TYPE.POST} />
          </MumbleCard>
        )}
        <Suspense fallback={<PostSkeleton skeletons={4} />}>
          <DashboardPosts />
        </Suspense>
      </div>
    </div>
  );
}
