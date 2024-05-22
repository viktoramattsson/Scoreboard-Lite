import { defaultCache } from '@serwist/next/worker';
import { Serwist } from 'serwist';

// Kontrollera att __SW_MANIFEST är definierad i den globala scopen
const precacheEntries = self.__SW_MANIFEST || [];

// Generera en slumpmässig revision
const revision = crypto.randomUUID();

// Skapa en ny instans av Serwist och konfigurera den
const serwist = new Serwist({
  precacheEntries: precacheEntries,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

// Initiera Serwist
serwist.addEventListeners();
