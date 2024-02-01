import LoginButton from '@/components/login-button';
import LogoutButton from '@/components/logout-button';
import { cn } from '@/utils/tailwind';
import { Avatar, Icon } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { auth } from './api/auth/[...nextauth]/auth';
import './globals.css';
const font = Poppins({
  variable: '--font-poppins',
  weight: ['500', '600', '700'],
  subsets: ['latin-ext'],
});

export const metadata: Metadata = {
  title: 'Mumble - Team Batman',
  description: 'Twitter clone for the CAS FEE 2023/24',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={cn(
          font.className,
          'grid h-dvh grid-cols-[1fr] grid-rows-[auto_1fr] justify-items-center bg-base-100',
        )}
      >
        <nav className="flex w-full place-content-center bg-primary-700">
          <div className="flex w-full max-w-content justify-between p-[12px]">
            <Link href="/">
              <div className="flex items-center p-xs">
                {/* // TODO: ADD SVG LOGO */}
                <Icon variant="mumble" className="h-[40px] w-[40px] fill-white" />
              </div>
            </Link>
            <div className="flex items-center gap-m p-xs">
              <Avatar size="s" image={{ alt: '', src: '' }} />
              {session ? <LogoutButton /> : <LoginButton />}
            </div>
          </div>
        </nav>

        <main className="flex w-full max-w-content px-l py-xl">{children}</main>
      </body>
    </html>
  );
}
