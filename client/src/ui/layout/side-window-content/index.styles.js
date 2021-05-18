import styled from 'styled-components';
import { APP_SCALES } from 'ui/helpers';

export const Container = styled('div')`
  box-sizing: border-box;
  height: calc(100vh - ${APP_SCALES.GLOBAL.SIBEBAR_HEIGHT_OVERFLOW} - ${APP_SCALES.WINDOW_CONTENT.PADDING});
  overflow-y: auto;
  overflow-x: hidden;
  margin: ${APP_SCALES.WINDOW_CONTENT.PADDING} 0 0 ${APP_SCALES.WINDOW_CONTENT.PADDING};
`;
