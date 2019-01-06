import * as React from 'react';
import PropTypes from 'prop-types';

import { Blocks } from 'ui';
import { Consumer } from 'bootstrap/provider';

const folderCard = function folderCard({ directory }) {
  const { path, name } = directory;

  return (
    <Consumer>
      {
        ({ updateSelectedDirectory }) => (
          <Blocks.DirectoryCard
            key={path}
            label={name}
            onClick={() => updateSelectedDirectory(directory)}
          />
        )
      }
    </Consumer>
  );
};

folderCard.propTypes = {
  directory: PropTypes.shape({
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default folderCard;
