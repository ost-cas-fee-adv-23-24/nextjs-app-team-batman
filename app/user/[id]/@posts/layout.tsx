import { ReactNode, Suspense } from 'react';

import MumbleUserTabGroup from '@/components/mumble/mumble-user-tabs';

export default function Layout({ children, params }: { children: ReactNode; params: { id: string } }) {
  return (
    <div className="mb-l mt-l">
      <div className="mb-m w-[400px]">
        <MumbleUserTabGroup id={params.id} />
      </div>
      <Suspense fallback={<p>Loading ...</p>}>{children}</Suspense>
    </div>
  );
}
