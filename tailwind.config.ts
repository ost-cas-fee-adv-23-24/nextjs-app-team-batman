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
        skeleton: {
          '0%': {
            backgroundImage: 'linear-gradient(to right, #94a3b8 , #cbd5e1, #cbd5e1)',
          },
          '50%': {
            backgroundImage: 'linear-gradient(to right, #cbd5e1 , #94a3b8, #cbd5e1)',
          },
          '100%': {
            backgroundImage: 'linear-gradient(to right, #cbd5e1 , #cbd5e1, #94a3b8)',
          },
        },
      },
      animation: {
        textintro: 'textintro 2s ease-in infinite',
        icontilt: 'icontilt 1.2s',
        skeleton: 'skeleton 0.75s linear infinite',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({ addComponents }: { addComponents: any }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      addComponents({
        '.mumble-container': {
          [cn('@apply w-full max-w-[680px]')]: {},
        },
      });
    },
  ],
};
export default config;
