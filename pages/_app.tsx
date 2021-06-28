import 'public/main.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { APP_COLORS } from 'ui/helpers';

function MyApp({ Component, pageProps }: AppProps) {
  const styles = `
    @media (prefers-color-scheme: dark) {
      body {
        background: ${APP_COLORS.BACKGROUND_DARK};
      }
    }
    @media (prefers-color-scheme: light) {
      body {
        background: ${APP_COLORS.BACKGROUND_WHITE};
      }
    }
  `;

  return (
    <>
      <Head>
        <title>Seedbox Downloader</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <style dangerouslySetInnerHTML={{ __html: styles}} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;