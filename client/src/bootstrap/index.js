import * as React from 'react';

import FileExplorer from 'business/file-explorer';

import SeedboxDownloaderProvider from 'bootstrap/provider';

export default function AppBootstrapper() {
  return (
    <SeedboxDownloaderProvider>
      <FileExplorer />
    </SeedboxDownloaderProvider>
  );
}
