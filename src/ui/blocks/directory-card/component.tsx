import React from 'react';
import type { ReactElement } from 'react';
import { APP_SCALES } from 'ui/helpers/scales';

import {
  FolderContainer,
  FullWidthAnchor,
  Icon,
  InnerMenuFloatingContainer,
  LabelContainer,
} from './index.styles';

interface Props {
  label: string
  onClick: () => void
  innerMenuOptions: ReactElement[]
}

export default function DirectoryCard({
  label,
  onClick,
  innerMenuOptions = [],
}: Props) {
  return (
    <FolderContainer>
      <FullWidthAnchor onClick={onClick} title={label}>
        <Icon
          width={APP_SCALES.WINDOW_CONTENT.DIRECTORY_ICON_WIDTH}
          height={APP_SCALES.WINDOW_CONTENT.DIRECTORY_ICON_HEIGHT}
        />
        <LabelContainer>{ label }</LabelContainer>
      </FullWidthAnchor>
      {
        innerMenuOptions.length > 0 && (
          <InnerMenuFloatingContainer className="floating-container">
            { innerMenuOptions }
          </InnerMenuFloatingContainer>
        )
      }
    </FolderContainer>
  );
}
