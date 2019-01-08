import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FolderFlatIcon from 'icons/folder-flat/component';
import { APP_FONT_STYLES } from 'ui/helpers/typography';
import { APP_SCALES } from 'ui/helpers/scales';

const Container = styled.button`
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: ${APP_SCALES.WINDOW_CONTENT.DIRECTORY_CARD_PADDING};
  background: transparent;
  margin: ${APP_SCALES.WINDOW_CONTENT.DIRECTORY_CARD_MARGIN};
  width: ${APP_SCALES.WINDOW_CONTENT.DIRECTORY_CARD_WIDTH};
  height: ${APP_SCALES.WINDOW_CONTENT.DIRECTORY_CARD_HEIGHT};
  text-overflow: ellipsis;
  overflow: hidden;
  border: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition:  box-shadow 0.3s cubic-bezier(.25,.8,.25,1);
  border-radius: 3px;

  &:hover {
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }

  &:focus {
    outline: 0;
  }
`;

const Icon = styled(FolderFlatIcon)`
  min-width: ${APP_SCALES.WINDOW_CONTENT.DIRECTORY_ICON_WIDTH};
`;

const LabelContainer = styled.span`
  ${APP_FONT_STYLES.FILE_WINDOW.DIRECTORY_LABEL}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: ${APP_SCALES.WINDOW_CONTENT.DIRECTORY_LABEL_LEFT_MARG};
`;

export default function DirectoryCard({ label, onClick }) {
  return (
    <Container onClick={onClick} type="button" title={label}>
      <Icon
        width={APP_SCALES.WINDOW_CONTENT.DIRECTORY_ICON_WIDTH}
        height={APP_SCALES.WINDOW_CONTENT.DIRECTORY_ICON_HEIGHT}
      />
      <LabelContainer>{ label }</LabelContainer>
    </Container>
  );
}

DirectoryCard.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
