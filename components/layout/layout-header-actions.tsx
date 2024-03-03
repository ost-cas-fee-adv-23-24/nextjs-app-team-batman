import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { getUser } from '@/utils/user';
import { userAvatar } from '@/utils/user-avatar';
import { Avatar } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import NextImage from 'next/image';
import Link from 'next/link';
import { ModalSettings } from '../modal/modal-settings';

export const LayoutHeaderActions = async () => {
  const session = await auth();
  if (!session) return null;

  const avatar = await userAvatar(session.user.id);
  const user = await getUser(session.user.id);
  if (!user) return null;

  return (
    <>
      <Link href={RouteService.page(PAGE_ROUTES.USER, { id: user.id })}>
        <Avatar size="s" image={{ alt: '', src: avatar, as: NextImage, width: 100, height: 100 }} />
      </Link>
      <ModalSettings user={user} />
    </>
  );
};
