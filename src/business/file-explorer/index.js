import React from 'react';

import { Layout } from 'ui';

import SideMenu from './components/side-menu';
import FileWindow from './components/file-window';

export default function FileExplorer() {
  return (
    <Layout.MainContent>
      <SideMenu />
      <FileWindow />
    </Layout.MainContent>
  );
}
