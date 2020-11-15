import PropTypes from 'prop-types';
import * as React from 'react';

import {
  askUserConfirmation,
  deleteFileFromServer,
  findRecursiveStructure,
  getTreeFromServer,
  updateExplorerPathAfterSelection,
} from './services';

/* eslint-disable react/no-unused-state */

export const AppContext = React.createContext({});
export const { Consumer } = AppContext;

export default class SeedboxDownloaderProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      directoryTree: null,
      selectedDirectory: null,
      explorerPath: [],
      askDeleteFile: (payload, fileName) => {
        askUserConfirmation(
          `Do you really want to delete ${fileName} ?`,
          () => this.deleteFile(payload),
        );
      },
      updateSelectedDirectory: (payload) => {
        const { state: { explorerPath } } = this;

        this.setState({
          selectedDirectory: payload,
          explorerPath: updateExplorerPathAfterSelection(payload, explorerPath),
        });
      },
      updateDirectoryByExplorer: (explorerItem) => {
        const { state: { explorerPath } } = this;

        const selectedItemIndex = explorerPath.findIndex(item => item.path === explorerItem.path);

        this.setState({
          selectedDirectory: explorerItem,
          explorerPath: explorerPath.slice(0, selectedItemIndex + 1),
        });
      },
      goToParentDirectory: () => {
        const { state: { explorerPath } } = this;
        const explorerPathCopy = [...explorerPath];

        explorerPathCopy.pop();

        const selectedDirectory = explorerPathCopy[explorerPathCopy.length - 1];

        this.setState({
          selectedDirectory,
          explorerPath: explorerPathCopy,
        });
      },
    };
  }

  async componentDidMount() {
    try {
      const tree = await getTreeFromServer();

      this.setState({
        explorerPath: [tree],
        directoryTree: tree,
        selectedDirectory: tree,
      });
    } catch (e) {
      global.console.warn('Error while trying to set the tree in state');
      global.console.error(e.message);
    }
  }

  async deleteFile(payload) {
    const { selectedDirectory: { path: selectedDirectoryPath } } = this.state;

    try {
      const { status } = await deleteFileFromServer(payload);

      if (status === 404) {
        global.console.warn('Unable to find file to delete');
        return;
      }
    } catch (e) {
      global.console.warn('Error while trying to delete file from server');
      global.console.error(e);
      return;
    }

    try {
      const updatedTree = await getTreeFromServer();

      this.setState({
        directoryTree: updatedTree,
        selectedDirectory: findRecursiveStructure(selectedDirectoryPath, updatedTree),
      });
    } catch (e) {
      global.console.warn('Error while refreshing tree from server after file deletion');
      global.console.error(e.message);
    }
  }

  render() {
    const { children } = this.props;

    return (
      <AppContext.Provider
        value={this.state}
      >
        { children }
      </AppContext.Provider>
    );
  }
}

SeedboxDownloaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
