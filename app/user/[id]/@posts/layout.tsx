'use client';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { TabGroup } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { redirect } from 'next/navigation';
import { ReactNode, Suspense } from 'react';

export default function Layout({ children, params }: { children: ReactNode; params: { id: string } }) {
  const handleClick = (s: string) => {
    redirect(s);
  };

  return (
    <div className="mb-l mt-l">
      <div className="mb-m w-[400px]">
        <TabGroup
          tabs={[
            {
              text: 'Deine Mumbles',
              onClick: () => handleClick(RouteService.page(PAGE_ROUTES.USER, { id: params.id })),
            },
            {
              text: 'Deine Likes',
              onClick: () => handleClick(RouteService.page(PAGE_ROUTES.USER_LIKED, { id: params.id })),
            },
          ]}
        />
      </div>
      <Suspense fallback={<p>Loading ...</p>}>{children}</Suspense>
    </div>
  );
}
