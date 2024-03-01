import { AVATAR_FALLBACK } from '@/utils/avatar-fallback';
import { Avatar } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import NextImage from 'next/image';
import { ReactNode } from 'react';
import { Skeleton } from '../skeleton/skeleton';

interface IMumbleCard {
  children: ReactNode;
  imageSrc?: string;
  skeleton?: boolean;
}

export const MumbleCard = ({ children, imageSrc, skeleton = false }: IMumbleCard) => {
  const image = imageSrc ?? AVATAR_FALLBACK;

  return (
    <div className="relative h-fit w-full items-center rounded-m bg-white px-xl py-l">
      <div className="absolute left-[-30px] top-m">
        {skeleton ? (
          <Skeleton className="h-[64px] w-[64px] rounded-full border-6 border-base-100 bg-base-200" />
        ) : (
          <Avatar size="m" image={{ alt: '', src: image, as: NextImage, width: 100, height: 100 }} />
        )}
      </div>
      <div className="grid gap-m">{children}</div>
    </div>
  );
};
