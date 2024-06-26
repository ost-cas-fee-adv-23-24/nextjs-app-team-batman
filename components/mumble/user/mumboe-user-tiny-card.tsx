'use client';
import { AVATAR_FALLBACK } from '@/app/app-config';
import { UPDATE_USERS_UNFOLLOW } from '@/utils/api/api-actions-user';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { cn } from '@/utils/tailwind';
import { Avatar, Button, Label } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import Link from 'next/link';
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
    await UPDATE_USERS_UNFOLLOW({ id });

    router.refresh();
  };
  return (
    <div className={cn('relative h-[242px] w-full items-center rounded-m bg-white p-s ')}>
      <Link href={RouteService.page(PAGE_ROUTES.USER, { id })}>
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
      </Link>
      <div className="flex justify-center pt-s">
        <Button size="m" variant="primary" onClick={handleUnfollow} fullWidth>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
