import React, { useState } from 'react';
import 'regenerator-runtime/runtime';
import { ThemeProvider } from 'styled-components';

import { themes } from 'ui/helpers/colors';
import getUserTheme from 'services/get-user-theme';
import FileExplorer from 'business/file-explorer';
import SeedboxHeader from 'business/seedbox-header';
import SeedboxDownloaderProvider from 'bootstrap/provider';

export default function AppBootstrapper() {
  const userTheme = getUserTheme();
  const [theme, setTheme] = useState(userTheme);

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
