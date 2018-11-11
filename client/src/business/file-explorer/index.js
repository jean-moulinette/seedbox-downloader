import * as React from 'react';

import { Layout } from 'ui';
import { Consumer } from 'bootstrap/provider';

import SideMenu from './components/side-menu';
import FileWindow from './components/file-window';

export default function FileExplorer() {
  return (
    <Layout.MainContent>
      <Consumer>
        {({ directoryStructure }) => (
          <React.Fragment>
            <SideMenu
              rootDirectory={directoryStructure}
            />
            <FileWindow
              rootDirectory={directoryStructure}
            />
          </React.Fragment>
        )}
      </Consumer>
    </Layout.MainContent>
  );
}
