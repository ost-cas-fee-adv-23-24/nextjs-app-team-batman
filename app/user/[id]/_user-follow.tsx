'use client';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { Button } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { usePathname, useRouter } from 'next/navigation';
import { UPDATE_USERS_FOLLOWERS } from '@/utils/api/api-actions-user';

export default function UserTabs({ id }: { id: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleFollow = async () => {
    await UPDATE_USERS_FOLLOWERS({ id });
  };

  return (
    <div className="grid w-full content-end justify-end gap-l">
      <Button variant="secondary" size="l" onClick={handleFollow}>
        Follow
      </Button>
    </div>
  );
}
