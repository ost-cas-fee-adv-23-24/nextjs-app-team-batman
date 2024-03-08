'use client';
import { cn } from '@/utils/tailwind';
import { Avatar, Label, Button } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { AVATAR_FALLBACK } from '@/app/app-config';
import { UPDATE_USERS_UNFOLLOW } from '@/utils/api/api-actions-user';
import { useRouter } from 'next/navigation';

interface IMumbleUserTinyCard {
  id: string;
  avatarUrl?: string;
  firstname?: string;
  lastname?: string;
  buttonText?: string;
}

export const MumbleUserTinyCard = ({ avatarUrl, id, firstname, lastname, buttonText = '' }: IMumbleUserTinyCard) => {
  const router = useRouter();
  const handleUnfollow = async () => {
    // Call unfollow API
    await UPDATE_USERS_UNFOLLOW({ id });

    // Refresh page
    router.refresh();
  };
  return (
    <div className={cn('relative h-[242px] w-full items-center rounded-m bg-white p-s sm:w-[216px]')}>
      <div className="flex items-center justify-center">
        <Avatar
          image={{
            src: avatarUrl ?? (AVATAR_FALLBACK as string),
            alt: 'avatar',
          }}
          size="l"
        />
      </div>
      <div className="items-center justify-center truncate pt-s text-center">
        <Label size="xl">
          {firstname} {lastname}
        </Label>
      </div>
      <div className="flex justify-center pt-s">
        <Button size="m" variant="primary" onClick={handleUnfollow} fullWidth>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
