'use client';
import { ErrorHandler } from '@/components/error/error-handler';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorHandler error={error} reset={reset} />;
}
