import { Logo, Icon } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
const font = Poppins({
  variable: '--font-poppins',
  weight: ['500', '600', '700'],
  subsets: ['latin-ext'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <nav className="h-20 flex items-center justify-around bg-primary-600 md:grid md:grid-cols-12 md:content-center">
          <div className="hidden items-center md:col-start-3 md:col-end-5 md:flex lg:col-start-4 lg:col-end-6">
            <Logo variant="white" />
          </div>
        </nav>
        <div className="flex items-center bg-primary-600 md:hidden">
          <Icon variant="mumble" size="l" className="m-xs fill-white" />
        </div>
        <main className="bg-base-100 md:grid md:grid-cols-12">
          <div className="px-4 flex flex-col sm:mx-auto sm:w-3/4 sm:px-0 md:col-start-3 md:col-end-11 md:mx-0 md:w-auto lg:col-start-4 lg:col-end-10">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
