import * as React from 'react';
import PropTypes from 'prop-types';

import { Layout } from 'ui';

import FilesGrid from './components/files-grid';
import FileCard from './components/file-card';
import FolderCard from './components/folder-card';

const fileWindow = function fileWindow({
  rootDirectory,
}) {
  console.log('file window rootdirectory', rootDirectory);

  return (
    <React.Fragment>
      <Layout.BreadCrumb />
      <FilesGrid>
        <FileCard />
        <FolderCard />
        <span>File Window</span>
      </FilesGrid>
    </React.Fragment>
  );
};

fileWindow.propTypes = {
  rootDirectory: PropTypes.shape({
    path: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({})),
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default fileWindow;
