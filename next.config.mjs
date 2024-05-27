import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'src/sw.js',
  swDest: 'public/sw.js',
  reloadOnOnline: true,
  disable: false,
  //disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  output: 'export',
  swcMinify: true,
  reactStrictMode: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Scoreboard-Lite/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/Scoreboard-Lite' : '',
  images: {
    loader: 'akamai',
    path: '',
  },
};

export default withSerwist(nextConfig);
