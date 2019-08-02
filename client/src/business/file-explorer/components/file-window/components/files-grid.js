import * as React from 'react';
import memoize from 'memoize-one';
import styled from 'styled-components';

import { Layout, Blocks } from 'ui';
import { AppContext } from 'bootstrap/provider';
import { Directory } from 'bootstrap/types';

import FileCard from './file-card';
import FolderCard from './folder-card';

const DirectoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
`;

const FilesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
`;

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
      goToParentDirectory,
      directoryTree: { path: rootDirectoryPath },
      selectedDirectory: { path: selectedDirectoryPath },
    } = this.context;

    if (rootDirectoryPath === selectedDirectoryPath) {
      return null;
    }

    return (
      <Blocks.DirectoryCard
        key="../"
        label="../"
        onClick={goToParentDirectory}
      />
    );
  }

  generateItems() {
    const { askDeleteFile } = this.context;
    const { selectedDirectory } = this.props;

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
    const childrenOfFiles = childrenSortedAlpha.filter(children => children.type !== 'directory');
    const childrenOfDirectories = childrenSortedAlpha.filter(children => children.type !== 'file');

    const childrenElements = {
      files: childrenOfFiles.map(file => (
        <FileCard
          file={file}
          key={file.path}
          deleteFile={() => askDeleteFile(file.path, file.name)}
        />
      )),
      directories: childrenOfDirectories.map(directory => (
        <FolderCard
          directory={directory}
          key={directory.path}
          deleteFile={() => askDeleteFile(directory.path, directory.name)}
        />
      )),
    };

    return (
      <React.Fragment>
        <DirectoriesContainer>
          { [this.generateNavigationItems(), ...childrenElements.directories] }
        </DirectoriesContainer>
        <FilesContainer>
          { childrenElements.files }
        </FilesContainer>
      </React.Fragment>
    );
  }

  render() {
    const { selectedDirectory } = this.props;
    const items = this.items(selectedDirectory);
    const isLoading = items === null;
    const itemsRendered = !isLoading
      ? this.generateItems()
      : null;

    return (
      <Layout.SideWindowContent>
        <Layout.Loader active={isLoading} />
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
