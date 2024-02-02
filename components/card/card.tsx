import { ReactNode } from 'react';

import { Avatar, IImageProps } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';

interface ICard {
  children: ReactNode;
  image?: Omit<IImageProps, 'imagePlacing' | 'rounded' | 'zoom'>;
}

export const Card = ({ children, image }: ICard) => {
  return (
    <div className="relative h-fit w-full items-center rounded-m bg-white px-xl py-l">
      <div className="absolute left-[-30px] top-m">
        <Avatar image={image ?? { alt: '', src: '' }} />
      </div>
      <div className="grid">{children}</div>
    </div>
  );
};
