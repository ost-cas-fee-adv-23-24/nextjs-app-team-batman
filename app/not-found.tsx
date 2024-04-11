import { Button } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Image src="/404.svg" alt="404" width={500} height={500} className="mx-auto" />

      <Link href="/" className="grid items-center" data-testid="notfound--button">
        <Button variant="secondary">Zurück zur Startseite</Button>
      </Link>
    </>
  );
}
