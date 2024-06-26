'use client';
import { AVATAR_FALLBACK } from '@/app/app-config';
import { TAPIPost } from '@/utils/api/api-types';
import { cn } from '@/utils/tailwind';
import { Avatar } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import NextImage from 'next/image';
import { ReactNode } from 'react';
import { Skeleton } from '../../skeleton/skeleton';

interface IMumbleCard {
  children: ReactNode;
  post?: TAPIPost;
  imageSrc?: string;
  skeleton?: boolean;
}

export const MumbleCard = ({ children, imageSrc, skeleton = false, post }: IMumbleCard) => {
  const image = imageSrc ?? AVATAR_FALLBACK;

  return (
    <div
      data-testid="mumble-card"
      className={cn(
        'relative h-fit w-full items-center rounded-m bg-white px-xl py-s pr-m sm:py-l sm:pr-xl',
        post && ' transition-colors duration-150 hover:ring hover:ring-base-200',
      )}
    >
      <div className="absolute left-[-30px] top-m">
        {skeleton ? (
          <Skeleton className="h-[64px] w-[64px] rounded-full border-6 border-base-100 bg-base-200" />
        ) : (
          <Avatar size="m" image={{ alt: 'User Picture', src: image, as: NextImage, width: 100, height: 100 }} />
        )}
      </div>
      <div className="grid gap-s sm:gap-m">{children}</div>
    </div>
  );
};
