'use client';
import { Icon, Label } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { signIn, signOut } from 'next-auth/react';

interface ILayoutHeaderAuthButton {
  variant?: 'login' | 'logout';
}

export const LayoutHeaderAuthButton = ({ variant }: ILayoutHeaderAuthButton) => {
  const label = variant === 'login' ? 'Login with Zitadel' : 'Log out';

  return (
    <button onClick={() => (variant === 'login' ? signIn('zitadel') : signOut())} className="group grid gap-xs">
      <Icon variant="logout-animated" size="m" className="ml-auto mr-auto fill-white transition" />
      <Label size="s" className="hidden cursor-pointer text-white md:block" as={'span'}>
        {label}
      </Label>
    </button>
  );
};
