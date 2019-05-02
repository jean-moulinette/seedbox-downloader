import * as React from 'react';

import { Blocks } from 'ui';
import PropTypes from 'prop-types';
import filesize from 'filesize';

const fileCard = function fileCard({ file }) {
  const { path, name, size } = file;

  return (
    <Blocks.FileCard
      key={path}
      label={name}
      size={filesize(size)}
      href={`/file${path}`}
    />
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
