import 'public/main.css';

import SeedboxHeader from 'business/seedbox-header';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import getUserDefaultTheme from 'services/get-user-default-theme';
import { getThemeSelectionFromStorage } from 'services/local-storage/theme';
import treeServices from 'services/tree';
import { ThemeProvider } from 'styled-components';
import { APP_COLORS } from 'ui/helpers';
import { LightThemeSymbol, themes } from 'ui/helpers/colors';
import type { ThemeSymbol } from 'ui/helpers/colors';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<ThemeSymbol>(LightThemeSymbol);

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

  useEffect(() => {
    const savedUserTheme = getThemeSelectionFromStorage();
    const userTheme = getUserDefaultTheme();

    setTheme(savedUserTheme || userTheme);
  }, []);

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
      <ThemeProvider theme={themes[theme]}>
        <SeedboxHeader
          onThemeChange={setTheme}
        />
          <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;