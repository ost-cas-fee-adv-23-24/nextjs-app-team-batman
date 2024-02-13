import MumbleUserTabGroup from '@/components/mumble/mumble-user-tabs';
import { ReactNode, Suspense } from 'react';

export default function Layout({ user, posts, params }: { user: ReactNode; posts: ReactNode; params: { id: string } }) {
  return (
    <div className="grid w-full gap-l">
      <Suspense fallback={<p>LOADING USER...</p>}>{user}</Suspense>

      <div className="mb-m w-[400px]">
        <MumbleUserTabGroup id={params.id} />
      </div>
      <div>{posts}</div>
    </div>
  );
}
