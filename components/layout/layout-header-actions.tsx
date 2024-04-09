import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { getUser } from '@/utils/helpers/get-user';
import { getUserAvatar } from '@/utils/helpers/get-user-avatar';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { Avatar } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import NextImage from 'next/image';
import Link from 'next/link';
import { ModalSettings } from '../modal/modal-settings';

export const LayoutHeaderActions = async () => {
  const session = await auth();
  if (!session) return null;

  const avatar = await getUserAvatar(session.user.id);
  const user = await getUser(session.user.id);
  if (!user) return null;

  return (
    <>
      <Link href={RouteService.page(PAGE_ROUTES.USER, { id: user.id })} date-testid="header-avatar">
        <Avatar size="s" image={{ alt: '', src: avatar, as: NextImage, width: 100, height: 100 }} />
      </Link>
      <ModalSettings user={user} />
    </>
  );
};
