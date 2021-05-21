import styled from 'styled-components';
import { APP_SCALES } from 'ui/helpers/scales';

export const Header = styled('header')`
  box-sizing: border-box;
  height: ${APP_SCALES.GLOBAL.HEADER_HEIGHT};
  transition: border-bottom 0.3s ease;
  border-bottom: solid ${({ theme }) => theme.menu.separator} ${APP_SCALES.GLOBAL.HEADER_BORDER};
  margin-bottom: ${APP_SCALES.GLOBAL.HEADER_BOTTOM_MARGIN};
`;
