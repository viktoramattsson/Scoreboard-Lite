import { useEffect } from 'react';
import '@/styles/globals.css';
import Head from 'next/head';
import { Source_Sans_3, Belanosima } from 'next/font/google';

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
});

const belanosima = Belanosima({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-belanosima',
});
export default function App({ Component, pageProps }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/Scoreboard-Lite/sw.js', { scope: '/Scoreboard-Lite/' })

          .then((registration) => {
            console.log(
              'ServiceWorker registration successful with scope: ',
              registration.scope
            );
          })
          .catch((err) => {
            console.log('ServiceWorker registration failed: ', err);
          });
      });
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Scoreboard Lite</title>
        <meta name="description" content="Scoreboard simplicity" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        {/*
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link
          rel="apple-touch-startup-image"
          href="/Scoreboard-Lite/apple-icon.png"
        /> */}
        <link rel="shortcut icon" href="/Scoreboard-Lite/favicon.ico" />
        <link rel="icon" href="/Scoreboard-Lite/logo.png" />
        <link
          rel="mask-icon"
          href="/Scoreboard-Lite/mask-icon.svg"
          color="#0891b2"
        />
        <meta name="theme-color" content="#0891b2" />
        <link rel="manifest" href="/Scoreboard-Lite/manifest.json" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/Scoreboard-Lite/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/Scoreboard-Lite/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/Scoreboard-Lite/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/Scoreboard-Lite/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/Scoreboard-Lite/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/Scoreboard-Lite/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/Scoreboard-Lite/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/Scoreboard-Lite/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/Scoreboard-Lite/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/Scoreboard-Lite/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/Scoreboard-Lite/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/Scoreboard-Lite/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/Scoreboard-Lite/favicon-16x16.png"
        />
      </Head>
      <main className={belanosima.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
