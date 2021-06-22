import { Consumer } from 'bootstrap/provider';
import CrossIcon from 'icons/cross/component';
import DownloadFolderIcon from 'icons/folder-download/component';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Blocks } from 'ui';

const folderCard = function folderCard({ directory, deleteFile }) {
  const { path, name } = directory;

  const downloadFolderLink = `/zip-folder${directory.path}`;

  const innerMenuOptions = [
    <Blocks.DirectoryCardOptionButton
      key={`download-${name}-option`}
      title={`Download ${name} as zip file`}
      href={downloadFolderLink}
      type="anchor"
      icon={<DownloadFolderIcon width="16px" height="16px" />}
    />,
    <Blocks.DirectoryCardOptionButton
      key={`delete-${name}-option`}
      title={`Delete ${name} on seedbox`}
      onClick={deleteFile}
      type="button"
      icon={<CrossIcon width="16px" height="16px" />}
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
  deleteFile: PropTypes.func.isRequired,
};

export default folderCard;
