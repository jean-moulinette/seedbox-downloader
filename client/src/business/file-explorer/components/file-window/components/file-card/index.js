import * as React from 'react';

import { Blocks } from 'ui';
import PropTypes from 'prop-types';
import filesize from 'filesize';
import CrossIcon from 'icons/cross/component';

const fileCard = function fileCard({ file, deleteFile }) {
  const { path, name, size } = file;

  const innerMenuOptions = [
    <Blocks.FileCardOptionButton
      key={`delete-${name}-option`}
      title={`Delete ${name} on seedbox`}
      onClick={deleteFile}
      type="button"
      icon={<CrossIcon width="16px" height="16px" />}
    />,
  ];

  return (
    <Blocks.FileCard
      key={path}
      label={name}
      size={filesize(size)}
      href={`/file${path}`}
      innerMenuOptions={innerMenuOptions}
    />
  );
};

fileCard.propTypes = {
  file: PropTypes.shape({
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
  }).isRequired,
  deleteFile: PropTypes.func.isRequired,
};

export default fileCard;
