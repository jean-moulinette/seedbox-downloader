import SeedboxDownloaderProvider from 'bootstrap/provider';
import {
  removeChildrensOfDirectoryChildren,
} from 'bootstrap/services';
import FileExplorer from 'business/file-explorer';
import type { DirectoryTree } from 'directory-tree';
import type { GetServerSideProps } from 'next';
import React from 'react';
import { getSeedboxDirectoryTreeJsonFile } from 'server/services';
import slugify from 'slugify';

interface Props {
  tree: DirectoryTree
  slugNamePath: string[]
}

function HomePage({
  tree,
  slugNamePath,
}: Props) {
  return (
    <SeedboxDownloaderProvider
      tree={tree}
      slugNamePath={slugNamePath}
    >
      <FileExplorer />
    </SeedboxDownloaderProvider>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const tree = JSON.parse(getSeedboxDirectoryTreeJsonFile());

  return {
    props: {
      tree: removeChildrensOfDirectoryChildren(tree),
      slugNamePath: [slugify(tree.name)],
    }
  };
};

export default HomePage;
