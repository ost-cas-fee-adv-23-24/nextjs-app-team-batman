import { TAPIPublicUser, TAPIUser } from '@/utils/api/api-types';
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
  user: TAPIUser | TAPIPublicUser;
  variant: MUMBLE_USER_INFO_VARIANT;
  postDate?: Date;
}

export const MumbleUserInfo = ({ variant, postDate: date, user }: IMumbleUserInfo) => {
  const fullUser = user as TAPIUser;
  const displayname = fullUser?.firstname && fullUser?.lastname ? `${fullUser.firstname} ${fullUser.lastname}` : null;
  const username = user?.username;
  const image = user.avatarUrl ?? AVATAR_FALLBACK;

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
    children: displayname ?? username,
  };

  return (
    <Link
      href={RouteService.page(PAGE_ROUTES.USER, { id: user.id })}
      className="relative flex place-items-center gap-xs"
    >
      {variant === MUMBLE_USER_INFO_VARIANT.REPLY && <Avatar {...avatarProps} />}
      <div className="flex flex-col gap-xs">
        <Label {...labelProps} className="capitalize" />
        <div className="flex flex-wrap gap-s">
          <LinkIcon icon="profile" text={username} />
          {date && <LinkIcon icon="calendar" text={date.toLocaleDateString('de-CH')} variant="secondary" />}
        </div>
      </div>
    </Link>
  );
};
