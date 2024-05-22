import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'src/sw.js', // Uppdatera vägen till din service worker-fil
  swDest: 'public/sw.js',
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === 'development', // to disable PWA in development
});

const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
};

export default withSerwist(nextConfig);
