import { ReactNode, Suspense } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<p>Loading ...</p>}>{children}</Suspense>;
}
