import * as React from 'react';
import PropTypes from 'prop-types';
import filesize from 'filesize';

import { Blocks } from 'ui';
import { Consumer } from 'bootstrap/provider';

const fileCard = function fileCard({ file }) {
  const { path, name, size } = file;

  return (
    <Consumer>
      {
        ({ downloadFile }) => (
          <Blocks.FileCard
            key={path}
            label={name}
            size={filesize(size)}
            onClick={() => { downloadFile(path); }}
          />
        )
      }
    </Consumer>
  );
};

fileCard.propTypes = {
  file: PropTypes.shape({
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
  }).isRequired,
};

export default fileCard;
