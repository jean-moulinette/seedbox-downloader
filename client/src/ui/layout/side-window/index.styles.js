import styled from 'styled-components';

import { APP_SCALES } from 'ui/helpers';

export const Section = styled('section')`
  width: calc(100vw - ${APP_SCALES.GLOBAL.SIDE_BAR_WIDTH});
  overflow: hidden;
  height: ${APP_SCALES.GLOBAL.MAIN_CONTENT_HEIGHT};
  padding: ${APP_SCALES.MENU.CONTENT_PADDING} 0 0 ${APP_SCALES.MENU.CONTENT_PADDING};
`;
