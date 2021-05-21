import styled from 'styled-components';

import { APP_SCALES } from 'ui/helpers';

export const Nav = styled('nav')`
  box-sizing: border-box;
  height: ${APP_SCALES.MENU.SIDE_MENU_HEIGHT};
  width: ${APP_SCALES.GLOBAL.SIDE_BAR_WIDTH};
  margin: 0 ${APP_SCALES.GLOBAL.WINDOW_EDGE_Y_MARGIN} 0 ${APP_SCALES.MENU.LEFT_MARGIN};
  padding-bottom: ${APP_SCALES.GLOBAL.WINDOW_EDGE_Y_MARGIN};
  transition: border-right 0.3s ease;
  border-right: solid ${({ theme }) => theme.menu.separator} ${APP_SCALES.MENU.SEPARATOR};
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 0;
`;

export const Ul = styled('ul')`
  list-style: none;
  padding: 0;
  margin: 0;
`;
