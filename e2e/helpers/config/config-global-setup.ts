/* eslint-disable no-console */
import { type FullConfig } from '@playwright/test';

// eslint-disable-next-line @typescript-eslint/require-await
async function globalSetup(config: FullConfig) {
  console.log('🎭 URL : ', config.projects[0].use.baseURL);
}

export default globalSetup;
