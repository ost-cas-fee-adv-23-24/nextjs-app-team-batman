import { LayoutHeader } from '@/components/layout/layout-header';
import { LayoutMainWrapper } from '@/components/layout/layout-main-wrapper';
import { cn } from '@/utils/tailwind';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Poppins } from 'next/font/google';
import { ReactNode } from 'react';
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
  manifest: '/manifest.json',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={cn(
          font.className,
          'grid min-h-dvh grid-cols-1 grid-rows-[auto_1fr] justify-items-center overscroll-none bg-base-100 text-base-900',
        )}
      >
        <LayoutHeader />
        <SessionProvider session={session}>
          <LayoutMainWrapper>{children}</LayoutMainWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
