import * as React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import {
  updateExplorerPathAfterSelection,
} from './services';

// Use for imported Consumer component
export const AppContext = React.createContext({});
export const { Consumer } = AppContext;

export default class SeedboxDownloaderProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      directoryTree: null,
      selectedDirectory: null,
      explorerPath: [],
      updateSelectedDirectory: (payload) => {
        const { state } = this;
        const { explorerPath } = state;

        this.setState({
          ...state,
          selectedDirectory: payload,
          explorerPath: updateExplorerPathAfterSelection(payload, explorerPath),
        });
      },
      updateDirectoryByExplorer: (explorerItem) => {
        const { state } = this;
        const { explorerPath } = state;

        const selectedItemIndex = explorerPath.findIndex(item => item.path === explorerItem.path);

        this.setState({
          ...state,
          selectedDirectory: explorerItem,
          explorerPath: explorerPath.slice(0, selectedItemIndex + 1),
        });
      },
      goToParentDirectory: () => {
        const { state } = this;
        const { explorerPath } = state;
        const explorerPathCopy = [...explorerPath];

        explorerPathCopy.pop();

        const selectedDirectory = explorerPathCopy[explorerPathCopy.length - 1];

        this.setState({
          ...state,
          selectedDirectory,
          explorerPath: explorerPathCopy,
        });
      },
    };
  }

  componentDidMount() {
    axios.get('/get-tree')
      .then((response) => {
        const { state } = this;
        const { data } = response;

        this.setState({
          ...state,
          explorerPath: [data],
          directoryTree: data,
          selectedDirectory: data,
        });
      })
      .catch(() => global.console.log('Could not fetch directory tree from server'));
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
