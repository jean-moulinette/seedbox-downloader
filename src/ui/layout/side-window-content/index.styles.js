import styled from 'styled-components';
import { APP_SCALES, BREAKPOINTS } from 'ui/helpers';

export const Container = styled('div')`
  box-sizing: border-box;
  margin: ${APP_SCALES.WINDOW_CONTENT.PADDING} 0 0 ${APP_SCALES.WINDOW_CONTENT.PADDING};

  ${BREAKPOINTS.mobile`
    margin-right: ${APP_SCALES.WINDOW_CONTENT.PADDING};
  `}
`;
