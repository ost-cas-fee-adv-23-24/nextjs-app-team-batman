'use client';

import { Button } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { signIn } from 'next-auth/react';

export default function LoginButton() {
  return (
    <Button
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
      onClick={() => signIn('zitadel')}
    >
      Login with Zitadel
    </Button>
  );
}
