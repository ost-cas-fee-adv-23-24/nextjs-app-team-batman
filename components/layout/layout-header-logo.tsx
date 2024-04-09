import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import Link from 'next/link';

export const LayoutHeaderLogo = () => (
  <Link href={RouteService.page(PAGE_ROUTES.HOME)} data-testid="header-logo">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 209 40"
      className="h-[24px] cursor-pointer sm:h-[40px]"
    >
      <g fill="#fff">
        <path d="M23.333 25h-6.666c-.954 0-1.81.53-2.237 1.383A2.482 2.482 0 0 0 14.666 29L18 33.446c.477.634 1.206.999 2 .999s1.523-.365 2-1.001l3.334-4.443a2.486 2.486 0 0 0 .236-2.618A2.487 2.487 0 0 0 23.333 25Z" />
        <path d="M38.06 16.076a27.542 27.542 0 0 0-1.63-3.505A6.67 6.67 0 0 0 40 6.667 6.673 6.673 0 0 0 33.333 0c-2.4 0-4.63 1.402-5.839 3.473A16.315 16.315 0 0 0 20 1.667c-2.787 0-5.284.68-7.494 1.806C11.296 1.402 9.067 0 6.666 0A6.673 6.673 0 0 0 0 6.667a6.67 6.67 0 0 0 3.569 5.904 27.557 27.557 0 0 0-1.63 3.505c-1.87 4.94-3.33 11.942.341 17.259C5.334 37.757 11.296 40 20 40c8.704 0 14.666-2.243 17.72-6.665 3.671-5.317 2.21-12.32.34-17.26ZM34.977 31.44C32.583 34.91 27.544 36.667 20 36.667c-7.544 0-12.583-1.758-14.977-5.227-2.85-4.126-1.555-9.99.032-14.183C5.832 15.21 10.2 5 20 5s14.168 10.21 14.944 12.258c1.587 4.192 2.883 10.056.033 14.182Z" />
        <path d="M16.064 20.633c1.504-2.139 1.634-2.99 1.259-4.461-.713-2.791-2.49-3.377-3.855-3.377-3.388 0-6.032 4.573-6.064 6.86-.02 1.374.535 2.804 1.452 3.734.643.65 1.398.996 2.186.996 2.104 0 3.72-1.896 5.022-3.752ZM26.532 12.795c-1.364 0-3.142.586-3.855 3.377-.376 1.471-.245 2.322 1.258 4.461 1.303 1.856 2.919 3.752 5.023 3.752.788 0 1.543-.345 2.186-.996.916-.93 1.471-2.36 1.452-3.732-.033-2.289-2.676-6.862-6.064-6.862Z" />
      </g>
      <path
        fill="#fff"
        d="M86.8 6.56v28.08h-6.84V17.8l-6.28 16.84h-5.52l-6.32-16.88v16.88H55V6.56h8.08L70.96 26l7.8-19.44h8.04ZM111.358 12.32v22.32h-6.84V31.6c-.693.987-1.64 1.787-2.84 2.4-1.173.587-2.48.88-3.92.88-1.706 0-3.213-.373-4.52-1.12-1.306-.773-2.32-1.88-3.04-3.32-.72-1.44-1.08-3.133-1.08-5.08V12.32h6.8v12.12c0 1.493.387 2.653 1.16 3.48.774.827 1.814 1.24 3.12 1.24 1.334 0 2.387-.413 3.16-1.24.774-.827 1.16-1.987 1.16-3.48V12.32h6.84ZM142.351 12.08c2.774 0 4.974.84 6.6 2.52 1.654 1.68 2.48 4.013 2.48 7v13.04h-6.8V22.52c0-1.44-.386-2.547-1.16-3.32-.746-.8-1.786-1.2-3.12-1.2-1.333 0-2.386.4-3.16 1.2-.746.773-1.12 1.88-1.12 3.32v12.12h-6.8V22.52c0-1.44-.386-2.547-1.16-3.32-.746-.8-1.786-1.2-3.12-1.2-1.333 0-2.386.4-3.16 1.2-.746.773-1.12 1.88-1.12 3.32v12.12h-6.84V12.32h6.84v2.8c.694-.933 1.6-1.667 2.72-2.2 1.12-.56 2.387-.84 3.8-.84 1.68 0 3.174.36 4.48 1.08a7.7 7.7 0 0 1 3.12 3.08c.774-1.227 1.827-2.227 3.16-3a8.541 8.541 0 0 1 4.36-1.16ZM160.655 15.48c.64-1.04 1.56-1.88 2.76-2.52 1.2-.64 2.573-.96 4.12-.96 1.84 0 3.507.467 5 1.4 1.493.933 2.667 2.267 3.52 4 .88 1.733 1.32 3.747 1.32 6.04s-.44 4.32-1.32 6.08c-.853 1.733-2.027 3.08-3.52 4.04-1.493.933-3.16 1.4-5 1.4-1.573 0-2.947-.307-4.12-.92-1.173-.64-2.093-1.48-2.76-2.52v3.12h-6.84V5.04h6.84v10.44Zm9.76 7.96c0-1.707-.48-3.04-1.44-4-.933-.987-2.093-1.48-3.48-1.48-1.36 0-2.52.493-3.48 1.48-.933.987-1.4 2.333-1.4 4.04 0 1.707.467 3.053 1.4 4.04.96.987 2.12 1.48 3.48 1.48 1.36 0 2.52-.493 3.48-1.48.96-1.013 1.44-2.373 1.44-4.08ZM185.403 5.04v29.6h-6.84V5.04h6.84ZM209 23.12c0 .64-.04 1.307-.12 2H193.4c.107 1.387.547 2.453 1.32 3.2.8.72 1.773 1.08 2.92 1.08 1.707 0 2.893-.72 3.56-2.16h7.28a9.852 9.852 0 0 1-2.04 3.96c-.96 1.173-2.173 2.093-3.64 2.76-1.467.667-3.107 1-4.92 1-2.187 0-4.133-.467-5.84-1.4-1.707-.933-3.04-2.267-4-4s-1.44-3.76-1.44-6.08c0-2.32.467-4.347 1.4-6.08.96-1.733 2.293-3.067 4-4 1.707-.933 3.667-1.4 5.88-1.4 2.16 0 4.08.453 5.76 1.36a9.634 9.634 0 0 1 3.92 3.88c.96 1.68 1.44 3.64 1.44 5.88Zm-7-1.8c0-1.173-.4-2.107-1.2-2.8-.8-.693-1.8-1.04-3-1.04-1.147 0-2.12.333-2.92 1-.773.667-1.253 1.613-1.44 2.84H202Z"
      />
    </svg>
  </Link>
);
