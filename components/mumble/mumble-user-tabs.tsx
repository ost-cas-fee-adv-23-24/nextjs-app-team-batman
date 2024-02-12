'use client';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { TabGroup } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { usePathname, useRouter } from 'next/navigation';

export default function MumbleUserTabGroup({ id }: { id: string }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="grid w-full gap-l">
      <TabGroup
        tabs={[
          {
            text: 'Deine Mumbles',
            onClick: () => router.push(RouteService.page(PAGE_ROUTES.USER, { id })),
            selected: pathname === RouteService.page(PAGE_ROUTES.USER, { id }),
          },
          {
            text: 'Deine Likes',
            onClick: () => router.push(RouteService.page(PAGE_ROUTES.USER_LIKED, { id })),
            selected: pathname === RouteService.page(PAGE_ROUTES.USER_LIKED, { id }),
          },
        ]}
      />
    </div>
  );
}
