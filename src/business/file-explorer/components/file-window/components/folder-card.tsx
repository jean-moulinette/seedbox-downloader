import { ActionTypes, AppContext } from 'bootstrap/provider';
import type { DirectoryTree } from 'directory-tree';
import CrossIcon from 'icons/cross/component';
import DownloadFolderIcon from 'icons/folder-download/component';
import React, { useContext } from 'react';
import type { ReactElement } from 'react';
import { Blocks } from 'ui';

interface Props {
  directory: DirectoryTree
  deleteFile: () => void
}

const FolderCard = ({ directory, deleteFile }: Props): ReactElement => {
  const { dispatch } = useContext(AppContext);
  const { path, name } = directory;

  const downloadFolderLink = `/api/folder/${directory.path}`;

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
    <Blocks.DirectoryCard
      key={path}
      label={name}
      onClick={() => dispatch({ type: ActionTypes.SET_SELECTED_DIRECTORY, payload: directory })}
      innerMenuOptions={innerMenuOptions}
    />
  );
};

export default FolderCard;