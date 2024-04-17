import { LayoutHeader } from '@/components/layout/layout-header';
import { LayoutMainWrapper } from '@/components/layout/layout-main-wrapper';
import { cn } from '@/utils/tailwind';
import type { Metadata, Viewport } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Poppins } from 'next/font/google';
import { ReactNode } from 'react';
import { ServiceWorker } from './_service-worker';
import { auth } from './api/auth/[...nextauth]/auth';
import './globals.css';

const font = Poppins({
  variable: '--font-poppins',
  weight: ['500', '600', '700'],
  subsets: ['latin-ext'],
});

const APP_NAME = 'Mumble';
const APP_DEFAULT_TITLE = 'Mumble - Team Batman';
const APP_DESCRIPTION = 'Twitter clone for the CAS FEE 2023/24';

export const metadata: Metadata = {
  manifest: '/manifest.json',
  applicationName: APP_NAME,
  title: APP_DEFAULT_TITLE,
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#6d28d9',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  return (
    <html lang="de">
      <body
        className={cn(
          font.className,
          'grid min-h-dvh grid-cols-1 grid-rows-[auto_1fr] justify-items-center overscroll-none bg-base-100 text-base-900',
        )}
      >
        <ServiceWorker />
        <LayoutHeader />
        <SessionProvider session={session}>
          <LayoutMainWrapper>{children}</LayoutMainWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
