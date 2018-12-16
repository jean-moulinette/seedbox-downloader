import * as React from 'react';

import { Layout } from 'ui';
import { AppContext } from 'bootstrap/provider';

import FilesGrid from './components/files-grid';

function generateBreadCrumbsItemForDirectory(
  explorerPath,
  updateDirectoryByExplorer,
  currentDir,
) {
  return explorerPath.map(directory => ({
    label: directory.name,
    key: `${directory.path}`,
    active: currentDir.path === directory.path,
    onClick: () => { updateDirectoryByExplorer(directory); },
  }));
}

// eslint-disable-next-line react/prefer-stateless-function
export default class FileWindow extends React.Component {
  render() {
    const {
      explorerPath,
      updateDirectoryByExplorer,
      selectedDirectory,
    } = this.context;

    const breadCrumbItems = explorerPath
      ? generateBreadCrumbsItemForDirectory(
        explorerPath,
        updateDirectoryByExplorer,
        selectedDirectory,
      )
      : null;


    return (
      <Layout.SideWindow>
        <Layout.BreadCrumb items={breadCrumbItems} />
        <FilesGrid />
      </Layout.SideWindow>
    );
  }
}

FileWindow.contextType = AppContext;
