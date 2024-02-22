import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { LayoutHeaderLoginButton, LayoutHeaderLogo, LayoutHeaderLogoutButton } from '@/components/layout';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { Avatar } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import NextImage from 'next/image';
import Link from 'next/link';
import { useGetUserAvatar } from '@/app/user/hooks/useGetUserAvatar';

export const LayoutHeader = async () => {
  const session = await auth();
  const userAvatar = await useGetUserAvatar(session?.user?.id);

  return (
    <header className="flex w-full place-content-center bg-primary-700">
      <div className="mx-s flex w-full max-w-content justify-between sm:py-[12px]">
        <div className="grid items-center py-xs">
          <LayoutHeaderLogo />
        </div>

        <div className="flex items-center gap-m p-xs">
          {session && (
            <Link href={RouteService.page(PAGE_ROUTES.USER, { id: session?.user?.id })}>
              <Avatar size="s" image={{ alt: '', src: userAvatar, as: NextImage, width: 100, height: 100 }} />
            </Link>
          )}

          {session ? <LayoutHeaderLogoutButton /> : <LayoutHeaderLoginButton />}
        </div>
      </div>
    </header>
  );
};
