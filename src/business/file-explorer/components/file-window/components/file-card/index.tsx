import type { DirectoryTree } from 'directory-tree';
import filesize from 'filesize';
import CrossIcon from 'icons/cross/component';
import * as React from 'react';
import { Blocks } from 'ui';

interface Props {
  file: DirectoryTree
  deleteFile: () => void
}

const fileCard = function fileCard({ file, deleteFile }: Props) {
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
      href={`/api/file/${path}`}
      innerMenuOptions={innerMenuOptions}
    />
  );
};

export default fileCard;
