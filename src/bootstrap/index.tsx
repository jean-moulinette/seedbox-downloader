import SeedboxDownloaderProvider from 'bootstrap/provider';
import FileExplorer from 'business/file-explorer';
import SeedboxHeader from 'business/seedbox-header';
import React, { useEffect, useState } from 'react';
import getUserDefaultTheme from 'services/get-user-default-theme';
import { getThemeSelectionFromStorage } from 'services/local-storage/theme';
import { ThemeProvider } from 'styled-components';
import { DarkThemeSymbol, LightThemeSymbol, themes } from 'ui/helpers/colors';

export default function AppBootstrapper() {
  const [theme, setTheme] = useState<
    typeof DarkThemeSymbol | typeof LightThemeSymbol
  >(LightThemeSymbol);

  useEffect(() => {
    const savedUserTheme = getThemeSelectionFromStorage();
    const userTheme = getUserDefaultTheme();

    setTheme(savedUserTheme || userTheme);
  }, []);

  return (
    <ThemeProvider theme={themes[theme]}>
      <SeedboxHeader
        onThemeChange={setTheme}
      />
      <SeedboxDownloaderProvider>
        <FileExplorer />
      </SeedboxDownloaderProvider>
    </ThemeProvider>
  );
}
