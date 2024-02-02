import { MumbleHeader } from '@/components/mumle-header';
import { cn } from '@/utils/tailwind';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(font.className, 'grid h-dvh grid-cols-1 grid-rows-[auto_1fr] justify-items-center bg-base-100')}
      >
        <header className="flex w-full place-content-center bg-primary-700">
          <MumbleHeader />
        </header>

        <main className="grid  w-full place-items-center items-start py-xl pl-l pr-s">
          <div className="flex w-full max-w-content place-content-center">{children}</div>
        </main>
      </body>
    </html>
  );
}
