import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { Button } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import Link from 'next/link';

export default function Layout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  return (
    <>
      <div>{JSON.stringify(params)}</div>

      <nav className="grid grid-cols-2">
        <Link href={RouteService.page(PAGE_ROUTES.USER, { id: params.id })}>
          <Button>USER POSTS</Button>
        </Link>
        <Link href={RouteService.page(PAGE_ROUTES.USER_LIKED, { id: params.id })}>
          <Button>LIKED POSTS</Button>
        </Link>
      </nav>

      <div>{children}</div>
    </>
  );
}
