import { defaultCache } from '@serwist/next/worker';
import { Serwist } from 'serwist';

const precacheEntries = self.__SW_MANIFEST || [];

const revision = crypto.randomUUID();

const serwist = new Serwist({
  precacheEntries: precacheEntries,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();
