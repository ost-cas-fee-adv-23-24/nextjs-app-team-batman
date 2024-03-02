/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { Config } from 'tailwindcss';
import { cn } from './utils/tailwind';

const config: Config = {
  presets: [require('@ost-cas-fee-adv-23-24/design-system-component-library-team-batman/tailwind.config.ts')],
  content: [
    './node_modules/@ost-cas-fee-adv-23-24/design-system-component-library-team-batman/dist/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)'],
      },
      spacing: {
        content: '680px',
      },
      keyframes: {
        'skeleton-background': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
      },
      animation: {
        'skeleton-background': 'skeleton-background 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [
    ({ addComponents, theme }: { addComponents: any; theme: any }) => {
      addComponents({
        '.mumble-container': {
          [cn('@apply w-full max-w-[680px]')]: {},
        },
        '.mumble-animate-skeleton': {
          background: `linear-gradient(
            -45deg, 
            ${theme('colors.base.200')},
            ${theme('colors.base.300')}, 
            ${theme('colors.base.200')}, 
            ${theme('colors.base.300')})`,
          backgroundSize: '300% 100%',
          [cn('@apply animate-skeleton-background')]: {},
        },
      });
    },
  ],
};
export default config;
