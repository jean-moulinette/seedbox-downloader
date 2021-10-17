import { ActionTypes, AppContext } from 'bootstrap/provider';
import type { DirectoryTree } from 'directory-tree';
import React, { useContext } from 'react';
import type { ReactElement } from 'react';
import { Layout } from 'ui';

import FilesGrid from './components/files-grid';

function generateBreadCrumbsItemForDirectory(
  explorerPath: DirectoryTree[],
  updateDirectoryByExplorer: (explorerItem: DirectoryTree) => void,
  currentDir: DirectoryTree,
) {
  return explorerPath.map((directory) => ({
    label: directory.name,
    key: `${directory.path}`,
    active: currentDir.path === directory.path,
    onClick: () => updateDirectoryByExplorer(directory),
  }));
}

export default function FileWindow(): ReactElement {
  const {
    state: {
      explorerPath,
      selectedDirectory,
      directoryTree,
    },
    dispatch,
  } = useContext(AppContext);

  const breadCrumbItems = explorerPath && selectedDirectory
    ? generateBreadCrumbsItemForDirectory(
        explorerPath,
        (explorerItem) => dispatch({
          type: ActionTypes.SET_EXPLORER_PATH,
          explorerItem
        }),
        selectedDirectory,
      )
    : null;

  return (
    <Layout.SideWindow>
      <Layout.Loader active={directoryTree === null} />
      <Layout.BreadCrumb items={breadCrumbItems} />
      <FilesGrid />
    </Layout.SideWindow>
  );
}
