import SeedboxDownloaderProvider from 'bootstrap/provider';
import {
  findRecursiveDirectoryByNameSlug,
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

function DirectoryPage({ tree, slugNamePath }: Props) {
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
  const slugArray = context.params?.directoryPath;

  if (slugArray && slugArray instanceof Array) {
    const slugToFind = [
      ...slugArray
    ].pop();

    if (slugToFind) {
      const tree = JSON.parse(getSeedboxDirectoryTreeJsonFile());
      const treeForSlug = findRecursiveDirectoryByNameSlug(slugToFind, tree);

      if (!treeForSlug) {
        return {
          redirect: {
            destination: '/404',
            permanent: false,
          }
        };
      }

      return {
        props: {
          tree: removeChildrensOfDirectoryChildren(treeForSlug),
          slugNamePath: [slugify(tree.name), ...slugArray],
        }
      };
    }
  }

  return {
    redirect: {
      destination: '/404',
      permanent: false,
    }
  };
};

export default DirectoryPage;
