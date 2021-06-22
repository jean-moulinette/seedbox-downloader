import * as React from 'react';

import { APP_SCALES } from 'ui/helpers/scales';
import PropTypes from 'prop-types';

import {
  FolderContainer,
  FullWidthAnchor,
  InnerMenuFloatingContainer,
  Icon,
  LabelContainer,
} from './index.styles';

export default function DirectoryCard({ label, onClick, innerMenuOptions }) {
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
            {/* eslint-disable-next-line react/no-array-index-key */}
            { innerMenuOptions }
          </InnerMenuFloatingContainer>
        )
      }
    </FolderContainer>
  );
}

DirectoryCard.defaultProps = {
  innerMenuOptions: [],
};

DirectoryCard.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  innerMenuOptions: PropTypes.arrayOf(PropTypes.element),
};
