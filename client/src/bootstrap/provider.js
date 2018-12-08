import * as React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Use for imported Consumer component
export const { Consumer, Provider } = React.createContext({});

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

        this.setState({
          ...state,
          directoryTree: data,
          selectedDirectory: data,

        });
      })
      .catch(() => global.console.log('Could not fetch directory tree from server'));
  }

  render() {
    const { children } = this.props;

    return (
      <Provider
        value={this.state}
      >
        { children }
      </Provider>
    );
  }
}

SeedboxDownloaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
