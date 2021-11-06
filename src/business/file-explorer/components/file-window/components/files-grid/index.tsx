import { ActionTypes, AppContext } from 'bootstrap/provider';
import type { DirectoryTree } from 'directory-tree';
import { useRouter } from 'next/router';
import React, { useCallback, useContext, useMemo } from 'react';
import type { ReactElement } from 'react';
import getSlugUrlForParentRoute from 'services/get-slug-url-for-parent-route';
import prompt from 'services/prompt';
import treeServices from 'services/tree';
import { Blocks } from 'ui';

import FileCard from '../file-card';
import FolderCard from '../folder-card';
import { DirectoriesContainer, FilesContainer } from './index.styles';

const deleteFile = async (filePath: string): Promise<DirectoryTree> => {
  try {
    await treeServices.deleteFileFromServer(filePath);
  } catch (e) {
    global.console.warn(`Error while trying to delete file ${filePath}`);
    throw e;
  }

  try {
    // TODO get only tree from current directory
    return await treeServices.getTreeFromServer();
  } catch (e) {
    global.console.warn('Error while refreshing tree from server after file deletion');
    throw e;
  }
};

const askDeleteFile = ({
  fileName,
  onDeleteAsked,
}: {
  fileName: string
  onDeleteAsked: () => void
}): void => {
  prompt(
    `Do you really want to delete ${fileName} ?`,
    onDeleteAsked,
  );
};

const FilesGrid = (): ReactElement => {
  const router = useRouter();
  const {
    state: {
      directoryTree,
    },
    dispatch,
  } = useContext(AppContext);

  const onDeleteFile = useCallback(
    async (filePath: string) => {
      try {
        const treeAfterDelete = await deleteFile(filePath);
        dispatch({
          type: ActionTypes.AFTER_FILE_DELETE,
          newTree: treeAfterDelete,
        });
      } catch (e) {
        global.console.error(e);
      }
    },
    [dispatch]
  );

  const directoryItems = useMemo(() => {
    if (!directoryTree || !directoryTree.children) {
      return {
        files: [],
        directories: [],
      };
    }

    const childrenSorted = directoryTree.children.sort((fileA, fileB) => {
      if (fileA.type === 'directory') { return -1; }
      if (fileB.type === 'file') { return 1; }
      return 0;
    });
    const childrenSortedAlpha = childrenSorted.sort((fileA, fileB) => {
      if (fileA.type === fileB.type) {
        if (fileA.name < fileB.name) { return -1; }
        if (fileA.name > fileB.name) { return 1; }
      }
      return 0;
    });
    const childrenOfFiles = childrenSortedAlpha.filter((children) => children.type !== 'directory');
    const childrenOfDirectories = childrenSortedAlpha.filter((children) => children.type !== 'file');

    return {
      files: childrenOfFiles.map((file) => (
        <FileCard
          file={file}
          key={file.path}
          deleteFile={() => askDeleteFile({
            fileName: file.name,
            onDeleteAsked: () => onDeleteFile(file.path),
          })}
        />
      )),
      directories: childrenOfDirectories.map((directory) => (
        <FolderCard
          directory={directory}
          key={directory.path}
          deleteFile={() => askDeleteFile({
            fileName: directory.name,
            onDeleteAsked: () => onDeleteFile(directory.path)
          })}
        />
      )),
    };
  }, [directoryTree]);

  return (
    <>
      <DirectoriesContainer>
        {router.asPath !== '/' && directoryTree && (
          <Blocks.DirectoryCard
            key="../"
            label="../"
            slug={getSlugUrlForParentRoute(router)}
          />
        )}
        {directoryItems.directories}
      </DirectoriesContainer>
      <FilesContainer>
        {directoryItems.files}
      </FilesContainer>
    </>
  );
};

export default FilesGrid;
