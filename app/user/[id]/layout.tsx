import UserTabs from '@/app/user/[id]/_user-tabs';
import SkeletonUserCard from '@/components/skeleton/skeleton-user-card';
import { ReactNode, Suspense } from 'react';
import UserCard from './_user-card';

export default function Layout({ children, params }: { children: ReactNode; params: { id: string } }) {
  return (
    <div className="grid w-full gap-s">
      <Suspense fallback={<SkeletonUserCard />}>
        <UserCard params={params} />
      </Suspense>

      <div className="mt-s max-w-[400px]">
        <UserTabs id={params.id} />
      </div>
      {children}
    </div>
  );
}
