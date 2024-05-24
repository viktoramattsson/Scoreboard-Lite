import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'src/sw.js', // Uppdatera vägen till din service worker-fil
  swDest: 'public/sw.js',
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development
});

const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  output: 'export',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Scoreboard-Lite/' : '',
  images: {
    loader: 'akamai',
    path: '',
  },
};

export default withSerwist(nextConfig);

// import withSerwistInit from '@serwist/next';

// const withSerwist = withSerwistInit({
//   swSrc: 'src/sw.js', // Uppdatera vägen till din service worker-fil
//   swDest: 'public/sw.js',
//   reloadOnOnline: true,
//   disable: process.env.NODE_ENV === 'development', // to disable PWA in development
// });

// const nextConfig = {
//   swcMinify: true,
//   reactStrictMode: true,
// };

// export default withSerwist(nextConfig);
