import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { Avatar } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { MumbleHeaderLogo } from '.';
import LoginButton from '../login-button';
import LogoutButton from '../logout-button';

export const MumbleHeader = async () => {
  const session = await auth();
  return (
    <div className="mx-s flex w-full max-w-content justify-between sm:py-[12px]">
      <div className="grid items-center py-xs">
        <MumbleHeaderLogo />
      </div>

      <div className="flex items-center gap-m p-xs">
        <Avatar size="s" image={{ alt: '', src: '' }} />
        {session ? <LogoutButton /> : <LoginButton />}
      </div>
    </div>
  );
};
