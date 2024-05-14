import { AVATAR_FALLBACK } from '@/app/app-config';
import { TAPIPublicUser, TAPIUser } from '@/utils/api/api-types';
import { MUMBLE_VARIANT } from '@/utils/enums';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { Avatar, Label, LinkIcon } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import NextImage from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';

import { readableCreatedDate } from '@/utils/helpers/readable-created-date';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import dayOfYear from 'dayjs/plugin/dayOfYear'; // Import the plugin
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.extend(dayOfYear);

interface IMumbleUserInfo {
  user: TAPIUser | TAPIPublicUser;
  variant: MUMBLE_VARIANT;
  postDate?: Date;
}

export const MumbleUserInfo = ({ variant, postDate, user }: IMumbleUserInfo) => {
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
      (variant === MUMBLE_VARIANT.REPLY && 'm') ||
      (variant === MUMBLE_VARIANT.TIMELINE && 'l') ||
      (variant === MUMBLE_VARIANT.DETAILVIEW && 'xl') ||
      'm',
    as: 'span',
    children: displayname ?? username,
  };

  const isDetailView = variant === MUMBLE_VARIANT.DETAILVIEW;
  const isReply = variant === MUMBLE_VARIANT.REPLY;

  return (
    <Link
      href={RouteService.page(PAGE_ROUTES.USER, { id: user.id })}
      className="duratin-300 relative flex place-items-center gap-xs  rounded-s transition-all hover:scale-105"
      data-testid="mumble-user-info"
    >
      {isReply && <Avatar {...avatarProps} />}
      <div className="flex flex-col gap-xs">
        <Label {...labelProps} className="max-w-[150px] truncate capitalize sm:max-w-none" />
        <div className="flex flex-wrap gap-s">
          <LinkIcon icon="profile" text={username} />
          {postDate && (
            <LinkIcon
              icon="calendar"
              text={
                isDetailView
                  ? dayjs(postDate).locale('de').format('D. MMMM YYYY - HH:mm')
                  : readableCreatedDate(postDate)
              }
              variant="secondary"
            />
          )}
        </div>
      </div>
    </Link>
  );
};
