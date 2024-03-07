'use client';
import { cn } from '@/utils/tailwind';
import { Avatar, Label, Button } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { AVATAR_FALLBACK } from '@/app/app-config';

interface IMumbleUserTinyCard {
  id: string;
  avatarUrl?: string;
  firstname?: string;
  lastname?: string;
  buttonText?: string;
  onClick?: () => void;
}

export const MumbleUserTinyCard = ({
  avatarUrl,
  id,
  firstname,
  lastname,
  buttonText = '',
  onClick,
}: IMumbleUserTinyCard) => {
  return (
    <div className={cn('relative h-[242px] w-[216px] items-center rounded-m bg-white p-s')}>
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
      <div className="pt-s">
        <Button size="m" variant="primary" onClick={onClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
