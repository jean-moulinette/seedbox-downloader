import * as React from 'react';
import PropTypes from 'prop-types';

// Use for imported Consumer component
export const { Consumer, Provider } = React.createContext({});

export default class SeedboxDownloaderProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line no-undef
      directoryStructure,
      // eslint-disable-next-line react/no-unused-state
      updateDirectoryStructure: function updateDirectoryStructure(payload) {
        const { state } = this;
        this.setState({
          ...state,
          directoryStructure: payload,
        });
      },
    };
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
