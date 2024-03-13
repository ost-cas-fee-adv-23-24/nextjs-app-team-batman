import SkeletonUserCard from '@/components/skeleton/skeleton-user-card';
import { ReactNode, Suspense } from 'react';
import UserCard from './_user-card';

export default function Layout({ children, params }: { children: ReactNode; params: { id: string } }) {
  return (
    <div className="grid w-full gap-s">
      <Suspense fallback={<SkeletonUserCard />}>
        <UserCard params={params} />
      </Suspense>
      {children}
    </div>
  );
}
