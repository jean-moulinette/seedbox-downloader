import * as React from 'react';
import memoize from 'memoize-one';
import styled from 'styled-components';

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

  generateItems() {
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
        ({ name, path }) => <Blocks.FileCard key={path} label={name} onClick={() => { }} />,
      ),
      directories: childrenOfDirectories.map(
        ({ name, path }) => <Blocks.FileCard key={path} label={name} onClick={() => { }} />,
      ),
    };

    return (
      <React.Fragment>
        { childrenElements.directories }
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
