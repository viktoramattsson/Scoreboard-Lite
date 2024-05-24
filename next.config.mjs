import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'src/sw.js', // Uppdatera vägen till din service worker-fil
  swDest: 'public/sw.js',
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development
});

const nextConfig = {
  output: 'export',
  swcMinify: true,
  reactStrictMode: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Scoreboard-Lite/' : '',
  images: {
    loader: 'akamai',
    path: '',
  },
};

export default withSerwist(nextConfig);
