import React, { useState } from 'react';
import 'regenerator-runtime/runtime';
import { ThemeProvider } from 'styled-components';

import { LightThemeSymbol, themes } from 'ui/helpers/colors';
import FileExplorer from 'business/file-explorer';
import SeedboxHeader from 'business/seedbox-header';
import SeedboxDownloaderProvider from 'bootstrap/provider';

export default function AppBootstrapper() {
  const [theme, setTheme] = useState(LightThemeSymbol);

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
