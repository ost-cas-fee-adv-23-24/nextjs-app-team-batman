'use client';
import { Button } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { useEffect } from 'react';
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <code>{error.message}</code>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
