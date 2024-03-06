'use client';
import { AVATAR_FALLBACK } from '@/app/app-config';
import { TAPIPost } from '@/utils/api/api-types';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { cn } from '@/utils/tailwind';
import { Avatar } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import NextImage from 'next/image';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  return (
    <div
      className={cn(
        'relative h-fit w-full items-center rounded-m bg-white px-xl py-l pr-m sm:pr-xl',
        post && 'cursor-pointer',
      )}
      onClick={() => {
        if (post) router.push(RouteService.page(PAGE_ROUTES.POSTS, { id: post.id }));
      }}
    >
      <div className="absolute left-[-30px] top-m">
        {skeleton ? (
          <Skeleton className="h-[64px] w-[64px] rounded-full border-6 border-base-100 bg-base-200" />
        ) : (
          <Avatar size="m" image={{ alt: 'User Picture', src: image, as: NextImage, width: 100, height: 100 }} />
        )}
      </div>
      <div className="grid gap-m">{children}</div>
    </div>
  );
};
