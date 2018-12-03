import * as React from 'react';

import { Layout } from 'ui';

import FilesGrid from './components/files-grid';

const fileWindow = function fileWindow() {
  return (
    <React.Fragment>
      <Layout.BreadCrumb />
      <FilesGrid />
    </React.Fragment>
  );
};

export default fileWindow;
