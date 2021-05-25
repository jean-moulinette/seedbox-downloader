import React, { useContext } from 'react';

import { Layout } from 'ui';
import { AppContext } from 'bootstrap/provider';

import FilesGrid from './components/files-grid';

function generateBreadCrumbsItemForDirectory(
  explorerPath,
  updateDirectoryByExplorer,
  currentDir,
) {
  return explorerPath.map((directory) => ({
    label: directory.name,
    key: `${directory.path}`,
    active: currentDir.path === directory.path,
    onClick: () => { updateDirectoryByExplorer(directory); },
  }));
}

export default function FileWindow() {
  const {
    explorerPath,
    updateDirectoryByExplorer,
    selectedDirectory,
    directoryTree,
  } = useContext(AppContext);

  const breadCrumbItems = explorerPath
    ? generateBreadCrumbsItemForDirectory(
      explorerPath,
      updateDirectoryByExplorer,
      selectedDirectory,
    )
    : null;

  return (
    <Layout.SideWindow>
      <Layout.Loader active={directoryTree === null} />
      <Layout.BreadCrumb items={breadCrumbItems} />
      <FilesGrid selectedDirectory={selectedDirectory} />
    </Layout.SideWindow>
  );
}
