import { FC, ReactNode } from 'react';

import { Avatar, IImageProps } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';

interface ICard {
  children: ReactNode;
  image?: Omit<IImageProps, 'imagePlacing' | 'rounded' | 'zoom'>;
}

export const Card: FC<ICard> = ({ children, image }) => {
  return (
    <div className="py-4 px-6 mt-4 md:py-8 md:px-12 border-1 rounded-xl relative m-l border-transparent lg:max-w-3xl">
      <div className="md:-left-20 relative flex items-center rounded-m bg-white p-l">
        {image && (
          <div className="top-x absolute left-[-30px]">
            <Avatar image={image} />
          </div>
        )}
        <div className="mb-4 relative flex w-3/4 flex-col">{children}</div>
      </div>
    </div>
  );
};
