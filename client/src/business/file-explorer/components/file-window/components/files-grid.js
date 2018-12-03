import * as React from 'react';

import { Layout } from 'ui';
import FileCard from './file-card';
import FolderCard from './folder-card';

const filesGrid = function filesGrid() {
  return (
    <div>
      <Layout.Loader active />
      <FileCard />
      <FolderCard />
    </div>
  );
};

export default filesGrid;
