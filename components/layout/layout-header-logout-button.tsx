'use client';
import { Button } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { signOut } from 'next-auth/react';

export const LayoutHeaderLogoutButton = () => {
  return <Button onClick={() => signOut()}>Logout</Button>;
};
