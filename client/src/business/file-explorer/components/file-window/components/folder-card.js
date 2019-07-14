import * as React from 'react';

import { Blocks } from 'ui';
import { Consumer } from 'bootstrap/provider';
import PropTypes from 'prop-types';

const folderCard = function folderCard({ directory }) {
  const { path, name } = directory;

  const downloadFolderLink = `/zip-folder${directory.path}`;

  const innerMenuOptions = [
    <Blocks.DownloadOption
      key={`download-${name}-option`}
      title={`Download ${name} as zip file`}
      href={downloadFolderLink}
    />,
    <Blocks.DownloadOption
    key={`downloadsssss-${name}-option`}
    title={`Download ${name} as zip file`}
    href={downloadFolderLink}
    />,
  ];

  return (
    <Consumer>
      {
        ({ updateSelectedDirectory }) => (
          <Blocks.DirectoryCard
            key={path}
            label={name}
            onClick={() => updateSelectedDirectory(directory)}
            innerMenuOptions={innerMenuOptions}
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
