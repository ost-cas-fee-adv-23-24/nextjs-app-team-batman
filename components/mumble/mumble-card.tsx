import { AVATAR_FALLBACK } from '@/utils/avatar-fallback';
import { Avatar } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import NextImage from 'next/image';
import { ReactNode } from 'react';

interface IMumbleCard {
  children: ReactNode;
  imageSrc?: string;
}

export const MumbleCard = ({ children, imageSrc }: IMumbleCard) => {
  const image = imageSrc ?? AVATAR_FALLBACK;

  return (
    <div className="relative h-fit w-full items-center rounded-m bg-white px-xl py-l">
      <div className="absolute left-[-30px] top-m">
        <Avatar size="m" image={{ alt: '', src: image, as: NextImage, width: 100, height: 100 }} />
      </div>
      <div className="grid">{children}</div>
    </div>
  );
};
