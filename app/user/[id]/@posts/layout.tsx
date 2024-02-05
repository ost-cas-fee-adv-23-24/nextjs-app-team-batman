import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { Button } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Layout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  return (
    <>
      <nav className="grid grid-cols-2">
        <Link href={RouteService.page(PAGE_ROUTES.USER, { id: params.id })}>
          <Button>USER POSTS</Button>
        </Link>
        <Link href={RouteService.page(PAGE_ROUTES.USER_LIKED, { id: params.id })}>
          <Button>LIKED POSTS</Button>
        </Link>
      </nav>

      <Suspense fallback={<p>Loading ...</p>}>
        <div className="border-2 border-r-primary-800 p-s">{children}</div>
      </Suspense>
    </>
  );
}
