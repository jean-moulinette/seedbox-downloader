import * as React from 'react';
import PropTypes from 'prop-types';

// Use for imported Consumer component
export const seedboxDownloaderCtx = React.createContext({});

export default class SeedboxDownloaderProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line no-undef
      directoryStructure,
      // eslint-disable-next-line react/no-unused-state
      updateDirectoryStructure: function updateDirectoryStructure() {
        const { directoryStructure } = this.state;
        this.setState(directoryStructure);
      },
    };
  }

  render() {
    const { children } = this.props;

    return (
      <seedboxDownloaderCtx.Provider
        value={this.state}
      >
        { children }
      </seedboxDownloaderCtx.Provider>
    );
  }
}

SeedboxDownloaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
