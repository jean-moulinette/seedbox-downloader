import * as React from 'react';

import { Layout } from 'ui';

import FilesGrid from './components/files-grid';

const fileWindow = function fileWindow() {
  return (
    <Layout.SideWindow>
      <Layout.BreadCrumb />
      <FilesGrid />
    </Layout.SideWindow>
  );
};

export default fileWindow;
