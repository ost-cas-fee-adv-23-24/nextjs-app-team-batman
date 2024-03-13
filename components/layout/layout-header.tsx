import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { Suspense } from 'react';
import { LayoutHeaderActions } from './layout-header-actions';
import { LayoutHeaderAuthButton } from './layout-header-auth-button';
import { LayoutHeaderLogo } from './layout-header-logo';

export const LayoutHeader = async () => {
  const session = await auth();
  return (
    <header className="sticky top-0 z-20 flex min-h-[56px] w-full place-content-center bg-primary-700">
      <div className="mx-s flex w-full max-w-content justify-between sm:py-[12px]">
        <div className="grid items-center py-xs duration-300 hover:scale-95">
          <LayoutHeaderLogo />
        </div>
        <div className="flex items-center gap-m p-xs">
          <Suspense fallback={null}>
            <LayoutHeaderActions />
          </Suspense>
          <LayoutHeaderAuthButton variant={session ? 'logout' : 'login'} />
        </div>
      </div>
    </header>
  );
};
