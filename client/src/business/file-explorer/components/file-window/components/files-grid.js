import * as React from 'react';
import memoize from 'memoize-one';
import styled from 'styled-components';
import filesize from 'filesize';

import { Layout, Blocks } from 'ui';
import { AppContext } from 'bootstrap/provider';
import { Directory } from 'bootstrap/types';

const Separator = styled.div`
  flex-basis: 100%;
  margin: 16px 0;
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
      <Blocks.FileCard
        key="../"
        label="../"
        onClick={() => goToParentDirectory()}
      />
    );
  }

  generateItems() {
    const { updateSelectedDirectory, downloadFile } = this.context;
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
      files: childrenOfFiles.map(
        ({ name, path, size }) => (
          <Blocks.FileCard
            key={path}
            label={name}
            size={filesize(size)}
            onClick={() => { downloadFile(path); }}
          />
        ),
      ),
      directories: childrenOfDirectories.map(
        directory => (
          <Blocks.DirectoryCard
            key={directory.path}
            label={directory.name}
            size={filesize(directory.size)}
            onClick={() => updateSelectedDirectory(directory)}
          />
        ),
      ),
    };

    return (
      <React.Fragment>
        { [this.generateNavigationItems(), ...childrenElements.directories] }
        <Separator />
        { childrenElements.files }
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
