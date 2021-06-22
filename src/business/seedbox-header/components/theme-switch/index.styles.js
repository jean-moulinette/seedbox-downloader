import styled from 'styled-components';

import { APP_FONT_STYLES } from 'ui/helpers/typography';
import { APP_SCALES } from 'ui/helpers/scales';

export const SwitchContainer = styled('div')`
  display: flex;
  align-items: center;
`;

export const ToggleContainer = styled('div')`
  margin: 0 ${APP_SCALES.GLOBAL.HEADER_TOGGLE_ICON_MARGIN};
`;

export const SwitchIconContainer = styled('div')`
  padding-top: 2px;

  ${APP_FONT_STYLES.HEADER.THEME_SWITCH_ICON}
`;
