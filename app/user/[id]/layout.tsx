import MumbleUserTabGroup from '@/components/mumble/mumble-user-tabs';
import PostSkeleton from '@/components/mumble/mumble-post-skeleton';
import { ReactNode, Suspense } from 'react';

export default function Layout({ user, posts, params }: { user: ReactNode; posts: ReactNode; params: { id: string } }) {
  return (
    <div className="grid w-full gap-l">
      <Suspense fallback={<p>LOADING USER...</p>}>{user}</Suspense>

      <div className="mb-m w-[400px]">
        <MumbleUserTabGroup id={params.id} />
      </div>
      <Suspense fallback={<PostSkeleton skeletons={2} />}>{posts}</Suspense>
    </div>
  );
}
