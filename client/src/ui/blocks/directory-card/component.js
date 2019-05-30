import * as React from 'react';

import styled from 'styled-components';

import { APP_FONT_STYLES } from 'ui/helpers/typography';
import { APP_SCALES } from 'ui/helpers/scales';
import FolderFlatIcon from 'icons/folder-flat/component';
import PropTypes from 'prop-types';

const Container = styled.div`
  position: relative;
`;

const FolderAnchor = styled.a`
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

  /* Little hack to target the button instead of it's container */
  &+div.inner-menu-container>div {
    transform: rotate(180deg);
    opacity: 0;
    transition: all 1s cubic-bezier(.25,.8,.25,1);
    transition-property: transform, opacity;
  }

  &:hover {
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

    &+div {
      transform: translateY(-60px);

      &.inner-menu-container>div {
        opacity: 1;
        transform: rotate(0deg);
      }
    }
  }

  &:focus {
    outline: 0;
  }
`;

const InnerMenuContainer = styled.div`
  position: absolute;
  right: ${APP_SCALES.WINDOW_CONTENT.DIRECTORY_CARD_INNER_MENU_RIGHT_MARGIN};
  height: ${APP_SCALES.WINDOW_CONTENT.DIRECTORY_CARD_INNER_MENU_ICON_SIZE};
  width: ${APP_SCALES.WINDOW_CONTENT.DIRECTORY_CARD_INNER_MENU_ICON_SIZE};
  border-radius: 100%;
  transition: transform 0.8s cubic-bezier(.25,.8,.25,1);

  /* Little hack to keep the button container on the Card even while hovering it */
  &:hover {
    transform: translateY(-60px) scale(1.1);

    &>div {
      transform: rotate(0deg) !important;
      opacity: 1 !important;
    }
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
  line-height: ${APP_SCALES.WINDOW_CONTENT.DIRECTORY_CARD_HEIGHT};
`;

export default function DirectoryCard({ label, onClick, innerMenuOptions }) {
  return (
    <Container>
      <FolderAnchor onClick={onClick} title={label}>
        <Icon
          width={APP_SCALES.WINDOW_CONTENT.DIRECTORY_ICON_WIDTH}
          height={APP_SCALES.WINDOW_CONTENT.DIRECTORY_ICON_HEIGHT}
        />
        <LabelContainer>{ label }</LabelContainer>
      </FolderAnchor>
      {
        innerMenuOptions.length > 0 ? (
          <InnerMenuContainer className="inner-menu-container">
            {/* eslint-disable-next-line react/no-array-index-key */}
            { innerMenuOptions }
          </InnerMenuContainer>
        ) : null
      }
    </Container>
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
