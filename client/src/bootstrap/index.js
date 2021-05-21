import React, { useState } from 'react';
import 'regenerator-runtime/runtime';
import { ThemeProvider } from 'styled-components';

import { themes } from 'ui/helpers/colors';
import { getThemeSelectionFromStorage } from 'services/local-storage/theme';
import getUserDefaultTheme from 'services/get-user-default-theme';
import FileExplorer from 'business/file-explorer';
import SeedboxHeader from 'business/seedbox-header';
import SeedboxDownloaderProvider from 'bootstrap/provider';

export default function AppBootstrapper() {
  const savedUserTheme = getThemeSelectionFromStorage();
  const userTheme = getUserDefaultTheme();
  const [theme, setTheme] = useState(savedUserTheme || userTheme);

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
