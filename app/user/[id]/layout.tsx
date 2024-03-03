import MumbleUserTabGroup from '@/components/mumble/mumble-user-tabs';
import SkeletonUserCard from '@/components/skeleton/skeleton-user-card';
import { ReactNode, Suspense } from 'react';
import UserTop from './_user-top';

export default function Layout({ children, params }: { children: ReactNode; params: { id: string } }) {
  return (
    <div className="grid w-full gap-s">
      <Suspense fallback={<SkeletonUserCard />}>
        <UserTop params={params} />
      </Suspense>

      <div className="mt-s max-w-[400px]">
        <MumbleUserTabGroup id={params.id} />
      </div>
      {children}
    </div>
  );
}
