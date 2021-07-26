import { AppContext } from 'bootstrap/provider';
import { ActionTypes } from 'bootstrap/provider';
import { Directory } from 'bootstrap/types';
import memoize from 'memoize-one';
import * as React from 'react';
import prompt from 'services/prompt';
import treeServices from 'services/tree';
import { Blocks, Layout } from 'ui';

import FileCard from '../file-card';
import FolderCard from '../folder-card';
import { DirectoriesContainer, FilesContainer } from './index.styles';

class FilesGrid extends React.Component {
  items = memoize(
    (selectedDirectory) => {
      if (selectedDirectory) {
        return selectedDirectory.children;
      }

      return null;
    },
  );

  generateNavigationItems() {
    const {
      state: {
        directoryTree: { path: rootDirectoryPath },
        selectedDirectory: { path: selectedDirectoryPath },
      },
      dispatch,
    } = this.context;

    if (rootDirectoryPath === selectedDirectoryPath) {
      return null;
    }

    return (
      <Blocks.DirectoryCard
        key="../"
        label="../"
        onClick={() => dispatch({
          type: ActionTypes.GO_TO_PARENT_DIRECTORY,
        })}
      />
    );
  }

  deleteFile = async (filePath) => {
    const { dispatch } = this.context;
    const { selectedDirectory: { path: selectedDirectoryPath } } = this.props;

    try {
      await treeServices.deleteFileFromServer(filePath);
    } catch (e) {
      global.console.warn(`Error while trying to delete file ${filePath}`);
      global.console.error(e);
      return;
    }

    try {
      const tree = await treeServices.getTreeFromServer();
      dispatch({
        type: ActionTypes.AFTER_FILE_DELETE,
        newTree: tree,
      });
    } catch (e) {
      global.console.warn('Error while refreshing tree from server after file deletion');
      global.console.error(e.message);
    }
  }

  generateItems() {
    const { selectedDirectory } = this.props;
    const askDeleteFile = (filePath, fileName) => {
      prompt(
        `Do you really want to delete ${fileName} ?`,
        () => this.deleteFile(filePath),
      );
    };

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

    const childrenElements = {
      files: childrenOfFiles.map((file) => (
        <FileCard
          file={file}
          key={file.path}
          deleteFile={() => askDeleteFile(file.path, file.name)}
        />
      )),
      directories: childrenOfDirectories.map((directory) => (
        <FolderCard
          directory={directory}
          key={directory.path}
          deleteFile={() => askDeleteFile(directory.path, directory.name)}
        />
      )),
    };

    return (
      <>
        <DirectoriesContainer>
          { [this.generateNavigationItems(), ...childrenElements.directories] }
        </DirectoriesContainer>
        <FilesContainer>
          { childrenElements.files }
        </FilesContainer>
      </>
    );
  }

  render() {
    const { selectedDirectory } = this.props;
    const items = this.items(selectedDirectory);
    const itemsRendered = items !== null
      ? this.generateItems()
      : null;

    return (
      <Layout.SideWindowContent>
        {itemsRendered}
      </Layout.SideWindowContent>
    );
  }
}

FilesGrid.defaultProps = {
  selectedDirectory: null,
};

FilesGrid.propTypes = {
  selectedDirectory: Directory,
};

FilesGrid.contextType = AppContext;

export default FilesGrid;
