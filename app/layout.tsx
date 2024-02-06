import { LayoutHeader, LayoutMainWrapper } from '@/components/layout';
import { cn } from '@/utils/tailwind';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ReactNode } from 'react';
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(font.className, 'grid h-dvh grid-cols-1 grid-rows-[auto_1fr] justify-items-center bg-base-100')}
      >
        <LayoutHeader />
        <LayoutMainWrapper>{children}</LayoutMainWrapper>
      </body>
    </html>
  );
}
