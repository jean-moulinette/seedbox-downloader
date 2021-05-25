import styled from 'styled-components';

import { APP_SCALES } from 'ui/helpers/scales';
import { APP_FONT_STYLES } from 'ui/helpers';

export const BreadCrumbContainer = styled('nav')`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
`;

export const CrumbItem = styled('span')`
  ${({ theme }) => APP_FONT_STYLES.BREADCRUMB.ITEM(theme)}
  padding: ${APP_SCALES.BREADCRUMB.CONTENT_PADDING};
  cursor: pointer;

  ${({ active, theme }) => active && `
    ${APP_FONT_STYLES.BREADCRUMB.ITEM_ACTIVE(theme)}
  `}
}`;

export const ChevronContainer = styled('div')`
  flex-shrink: 0;
`;
