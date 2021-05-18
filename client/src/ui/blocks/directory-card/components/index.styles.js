import styled from 'styled-components';

import { APP_COLORS } from 'ui/helpers/colors';

export const Container = styled('div')`
  position: relative;
  display: inline-block;
  cursor: pointer;
  width: 16px;
  height: 16px;
  padding: 5px;
  margin: 0 5px;
  border-radius: 50%;
  background: ${APP_COLORS.FILE_WINDOW.DIRECTORY_OPTION_BUTTON_BACKGROUND};
  border: 1px ${APP_COLORS.FILE_WINDOW.DIRECTORY_OPTION_BUTTON_BORDER} solid;
  transition: transform 1s cubic-bezier(.25,.8,.25,1);
  z-index: 1;

  &:hover {
    transform: scale(1.15) !important;
  }
`;

export const InteractibleButton = styled('button')`
  cursor: pointer;
  border: none;
  background: transparent;
  margin: 0;
  padding: 0;
  outline: 0;
`;
