import { AVATAR_FALLBACK } from '@/utils/avatar-fallback';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { Avatar, Label, LinkIcon } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import NextImage from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';

export enum MUMBLE_USER_INFO_VARIANT {
  REPLY = 'REPLY',
  TIMELINE = 'TIMELINE',
  DETAILVIEW = 'DETAILVIEW',
}

interface IMumbleUserInfo {
  displayname: string;
  username: string;
  userId?: string;
  imageSrc?: string;
  variant: MUMBLE_USER_INFO_VARIANT;
  date?: Date;
}

export const MumbleUserInfo = ({ variant, date, username, displayname, imageSrc, userId }: IMumbleUserInfo) => {
  const image = imageSrc ?? AVATAR_FALLBACK;

  const avatarProps: ComponentProps<typeof Avatar> = {
    size: 's',
    image: { alt: '', src: image, as: NextImage, width: 100, height: 100 },
  };

  const labelProps: ComponentProps<typeof Label> = {
    size:
      (variant === MUMBLE_USER_INFO_VARIANT.REPLY && 'm') ||
      (variant === MUMBLE_USER_INFO_VARIANT.TIMELINE && 'l') ||
      (variant === MUMBLE_USER_INFO_VARIANT.DETAILVIEW && 'xl') ||
      'm',
    as: 'span',
    children: displayname,
  };

  const content = (
    <div className="relative flex place-items-center gap-xs">
      {variant === MUMBLE_USER_INFO_VARIANT.REPLY && <Avatar {...avatarProps} />}
      <div className="flex flex-col gap-xs">
        <Label {...labelProps} />
        <div className="flex flex-wrap gap-s">
          <LinkIcon icon="profile" text={username} />
          {date && <LinkIcon icon="calendar" text={date.toLocaleDateString()} variant="secondary" />}
        </div>
      </div>
    </div>
  );

  if (userId) {
    return <Link href={RouteService.page(PAGE_ROUTES.USER, { id: userId })}>{content}</Link>;
  }

  return content;
};
