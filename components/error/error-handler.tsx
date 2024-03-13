'use client';
import { Button, Heading } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { useEffect } from 'react';

interface IErrorHandler {
  error: Error;
  reset: () => void;
  customButtonText?: string;
}
export const ErrorHandler = ({ error, reset, customButtonText }: IErrorHandler) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="m-m grid items-center gap-s rounded-m bg-error/20 p-s text-center">
      <Heading level={4} className="text-error">
        🧐 Oops! Etwas ist schief gelaufen...
      </Heading>
      <Button onClick={() => reset()}>{customButtonText ?? 'nochmal versuchen'}</Button>
    </div>
  );
};
