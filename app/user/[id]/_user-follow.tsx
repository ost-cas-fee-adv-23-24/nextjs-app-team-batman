'use client';
import { UPDATE_USERS_FOLLOWERS, UPDATE_USERS_UNFOLLOW } from '@/utils/api/api-actions-user';
import { Button, Label } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { useRouter } from 'next/navigation';

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
    <div className="mt-l grid w-full content-end justify-end gap-l">
      {iAmFollower ? (
        <div className="flex items-center gap-s text-base-400">
          <Label size="m" className="" as="span">
            Du folgst dieser Person
          </Label>
          <Button variant="secondary" size="m" onClick={handleUnFollow} icon="cancel">
            Unfollow
          </Button>
        </div>
      ) : (
        <Button variant="secondary" size="m" onClick={handleFollow}>
          👀 Follow
        </Button>
      )}
    </div>
  );
}
