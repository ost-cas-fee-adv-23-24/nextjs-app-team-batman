'use client';

import { Button } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    <Button onClick={() => signOut()}>Logout</Button>
  );
}
