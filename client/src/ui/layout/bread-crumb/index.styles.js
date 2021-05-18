import styled from 'styled-components';

import { APP_SCALES } from 'ui/helpers/scales';
import { APP_FONT_STYLES } from 'ui/helpers/typography';

export const BreadCrumbContainer = styled('nav')`
  box-sizing: border-box;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  min-height: ${APP_SCALES.BREADCRUMB.MIN_HEIGHT};
  padding: ${APP_SCALES.BREADCRUMB.PADDING} 0;
`;

export const CrumbItem = styled('span')`
  ${APP_FONT_STYLES.BREADCRUMB.ITEM}
  padding: ${APP_SCALES.BREADCRUMB.CONTENT_PADDING};
  cursor: pointer;
  margin-right: ${APP_SCALES.BREADCRUMB.ITEM_MARGIN};

  ${({ active }) => active && `
    ${APP_FONT_STYLES.BREADCRUMB.ITEM_ACTIVE}
  `}

  ${({ active }) => !active && `
    &::after {
        border-style: solid;
        border-width: 0.15em 0.15em 0 0;
        content: '';
        display: inline-block;
        height: 0.25em;
        left: 1em;
        position: relative;
        transform: rotate(45deg);
        width: 0.25em;
      }
  `}
}`;
