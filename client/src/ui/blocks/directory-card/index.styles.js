import styled from 'styled-components';

import { APP_SCALES, APP_FONT_STYLES, BREAKPOINTS } from 'ui/helpers';
import FolderFlatIcon from 'icons/folder-flat/component';

export const FolderContainer = styled('div')`
  position: relative;
  cursor: pointer;
  box-shadow: 0 1px 3px ${({ theme }) => theme.textPrimary}1A, 0 1px 2px ${({ theme }) => theme.textPrimary}3D;
  margin: ${APP_SCALES.WINDOW_CONTENT.DIRECTORY_CARD_MARGIN};
  width: ${APP_SCALES.WINDOW_CONTENT.DIRECTORY_CARD_WIDTH};
  height: ${APP_SCALES.WINDOW_CONTENT.DIRECTORY_CARD_HEIGHT};
  border-radius: 3px;
  transition: box-shadow 0.3s cubic-bezier(.25,.8,.25,1);

  ${BREAKPOINTS.mobile`
    width: auto;
  `}

  &>.floating-container {
    &>div {
      transition: transform 1.2s cubic-bezier(.25,.8,.25,1);
      transform: rotate(180deg);
    }
  }

  &:hover {
    &>.floating-container {
      opacity: 1;
      transform: translateY(0);

      &>div {
        transform: rotate(0deg);
      }
    }
  }

  &:hover {
    box-shadow: 0 3px 6px ${({ theme }) => theme.textPrimary}29, 0 3px 6px ${({ theme }) => theme.textPrimary}3B;
  }

  &:focus {
    outline: 0;
  }
`;

export const FullWidthAnchor = styled('a')`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: ${APP_SCALES.WINDOW_CONTENT.DIRECTORY_CARD_PADDING};
  background: transparent;
  text-overflow: ellipsis;
  overflow: hidden;
  border: none;
`;

export const InnerMenuFloatingContainer = styled('div')`
  position: absolute;
  top: 20px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  opacity: 0;
  transition: 1s cubic-bezier(.25,.8,.25,1);
  transition-property: transform opacity;
  transform: translateY(80px);
`;

export const Icon = styled(FolderFlatIcon)`
  min-width: ${APP_SCALES.WINDOW_CONTENT.DIRECTORY_ICON_WIDTH};
`;

export const LabelContainer = styled('span')`
  ${({ theme }) => APP_FONT_STYLES.FILE_WINDOW.DIRECTORY_LABEL(theme)}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: ${APP_SCALES.WINDOW_CONTENT.DIRECTORY_LABEL_LEFT_MARG};
  line-height: ${APP_SCALES.WINDOW_CONTENT.DIRECTORY_CARD_HEIGHT};
`;
