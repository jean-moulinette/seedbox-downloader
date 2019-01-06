import * as React from 'react';
import PropTypes from 'prop-types';
import filesize from 'filesize';

import { Blocks } from 'ui';
import { Consumer } from 'bootstrap/provider';

const folderCard = function folderCard({ directory }) {
  const { path, size, name } = directory;

  return (
    <Consumer>
      {
        ({ updateSelectedDirectory }) => (
          <Blocks.DirectoryCard
            key={path}
            label={name}
            size={filesize(size)}
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
    size: PropTypes.number.isRequired,
  }).isRequired,
};

export default folderCard;
