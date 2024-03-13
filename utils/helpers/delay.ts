import { MIN_DELAY } from '@/app/app-config';

export const delay = (ms = MIN_DELAY) => new Promise((resolve) => setTimeout(resolve, ms));
