import UserTabs from '@/app/user/[id]/_user-tabs';
import { ReactNode, Suspense } from 'react';

export default function Layout({ children, params }: { children: ReactNode; params: { id: string } }) {
  return (
    <div className="grid w-full gap-s">
      <div className="mt-s max-w-[400px]">
        <UserTabs id={params.id} />
      </div>
      {children}
    </div>
  );
}
