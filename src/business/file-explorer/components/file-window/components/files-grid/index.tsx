import { ActionTypes, AppContext } from 'bootstrap/provider';
import type { DirectoryTree } from 'directory-tree';
import React, { useCallback, useContext, useMemo } from 'react';
import type { ReactElement } from 'react';
import prompt from 'services/prompt';
import treeServices from 'services/tree';
import { Blocks, Layout } from 'ui';

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
  const {
    state: {
      selectedDirectory,
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
    if (!selectedDirectory || !selectedDirectory.children) {
      return {
        files: [],
        directories: [],
      };
    }

    const childrenSorted = selectedDirectory.children.sort((fileA, fileB) => {
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
  }, [selectedDirectory]);

  return (
    <>
      <DirectoriesContainer>
        {selectedDirectory?.path !== directoryTree?.path && (
          <Blocks.DirectoryCard
          key="../"
          label="../"
          onClick={() => dispatch({
            type: ActionTypes.GO_TO_PARENT_DIRECTORY,
          })}
        />)}
        {directoryItems.directories}
      </DirectoriesContainer>
      <FilesContainer>
        {directoryItems.files}
      </FilesContainer>
    </>
  );
};

export default FilesGrid;
