import { MUMBLE_POSTS_PAGINATION } from '@/app/app-config';
import PostSkeleton from '@/components/mumble/mumble-post-skeleton';
import UserSkeleton from '@/components/mumble/mumble-user-skeleton';
import MumbleUserTabGroup from '@/components/mumble/mumble-user-tabs';
import { ReactNode, Suspense } from 'react';

export default function Layout({ user, posts, params }: { user: ReactNode; posts: ReactNode; params: { id: string } }) {
  return (
    <div className="grid w-full gap-s">
      <Suspense fallback={<UserSkeleton />}>{user}</Suspense>

      <div className="mt-s max-w-[400px]">
        <MumbleUserTabGroup id={params.id} />
      </div>
      <Suspense fallback={<PostSkeleton count={MUMBLE_POSTS_PAGINATION} />}>{posts}</Suspense>
    </div>
  );
}
