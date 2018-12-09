import * as React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { normalizeTree } from './services';

// Use for imported Consumer component
export const AppContext = React.createContext({});
export const { Consumer } = AppContext;

export default class SeedboxDownloaderProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      directoryTree: null,
      selectedDirectory: null,
      // eslint-disable-next-line react/no-unused-state
      updateSelectedDirectory: (payload) => {
        const { state } = this;

        this.setState({
          ...state,
          selectedDirectory: payload,
        });
      },
    };
  }

  componentDidMount() {
    axios.get('/get-tree')
      .then((response) => {
        const { state } = this;
        const { data } = response;
        const treeNormalized = normalizeTree(data);

        this.setState({
          ...state,
          directoryTree: treeNormalized,
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
