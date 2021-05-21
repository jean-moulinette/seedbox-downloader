import styled from 'styled-components';

import { APP_SCALES } from 'ui/helpers/scales';

export const ContentContainer = styled('div')`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 ${APP_SCALES.MENU.LEFT_MARGIN};
`;
