import * as React from 'react';

import { Layout } from 'ui';
import { Consumer } from 'bootstrap/provider';

import SideMenu from './components/side-menu';
import FileWindow from './components/file-window';

export default function FileExplorer() {
  return (
    <Layout.MainContent>
      <Consumer>
        {
          ({
            directoryTree,
            selectedDirectory,
            updateSelectedDirectory,
          }) => (
            <React.Fragment>
              <SideMenu
                rootDirectory={directoryTree}
                selectedDirectory={selectedDirectory}
                updateSelectedDirectory={updateSelectedDirectory}
              />
              <FileWindow
                rootDirectory={directoryTree}
              />
            </React.Fragment>
          )
        }
      </Consumer>
    </Layout.MainContent>
  );
}
