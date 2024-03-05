'use client';
import { Button } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { useRouter } from 'next/navigation';
import { UPDATE_USERS_FOLLOWERS, UPDATE_USERS_UNFOLLOW } from '@/utils/api/api-actions-user';

export default function UserTabs({ id, iAmFollower = false }: { id: string; iAmFollower: boolean }) {
  const router = useRouter();

  const handleFollow = async () => {
    await UPDATE_USERS_FOLLOWERS({ id });
    router.refresh();
  };
  const handleUnFollow = async () => {
    await UPDATE_USERS_UNFOLLOW({ id });
    router.refresh();
  };

  return (
    <div className="grid w-full content-end justify-end gap-l">
      {iAmFollower ? (
        <Button variant="secondary" size="l" onClick={handleUnFollow} icon="cancel">
          Unfollow
        </Button>
      ) : (
        <Button variant="secondary" size="l" onClick={handleFollow}>
          Follow
        </Button>
      )}
    </div>
  );
}
