import * as React from 'react';

import { Layout } from 'ui';
import { Consumer } from 'bootstrap/provider';

import SideMenu from './components/side-menu';

export default function FileExplorer() {
  return (
    <Layout.MainContent>
      <Consumer>
        {({ directoryStructure }) => (
          <SideMenu
            rootDirectory={directoryStructure}
          />
        )}
      </Consumer>
    </Layout.MainContent>
  );
}
