'use client';
import { Icon, Label } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { signOut } from 'next-auth/react';

export const LayoutHeaderLogoutButton = () => {
  return (
    <button onClick={() => signOut()} className="ml-m">
      <Icon variant="logout" size="m" className="ml-auto mr-auto fill-white transition" />
      <Label size="s" className="mt-xs hidden cursor-pointer text-white md:block">
        Log out
      </Label>
    </button>
  );
};
