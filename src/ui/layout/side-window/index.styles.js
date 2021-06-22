import styled from 'styled-components';

import { APP_SCALES, BREAKPOINTS } from 'ui/helpers';

export const Section = styled('section')`
  width: calc(100vw - ${APP_SCALES.GLOBAL.SIDE_BAR_WIDTH});
  overflow-y: scroll;
  height: ${APP_SCALES.WINDOW_CONTENT.HEIGHT};
  padding: ${APP_SCALES.MENU.CONTENT_PADDING} 0 0 ${APP_SCALES.MENU.CONTENT_PADDING};

  ${BREAKPOINTS.mobile`
    width: 100vw;
  `}
`;
