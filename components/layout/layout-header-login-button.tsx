'use client';
import { Button } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { signIn } from 'next-auth/react';

export const LayoutHeaderLoginButton = () => {
  return <Button onClick={() => signIn('zitadel')}>Login with Zitadel</Button>;
};
