import { css } from 'styled-components';

export const SCALES = {
  XXL: 80,
  XL: 40,
  L: 32,
  M: 16,
  S: 14,
  XS: 12,
  XXS: 8,
};

const globalHeaderHeight = '64px';
const headerBottomMargin = `${SCALES.M}px`;
const windowEdgeYMargin = `${SCALES.M}px`;

export const APP_SCALES = {
  GLOBAL: {
    SIDE_BAR_WIDTH: '280px',
    SIBEBAR_HEIGHT_OVERFLOW: '67px',
    HEADER_HEIGHT: globalHeaderHeight,
    HEADER_BORDER: '2px',
    HEADER_BOTTOM_MARGIN: headerBottomMargin,
    WINDOW_EDGE_Y_MARGIN: windowEdgeYMargin,
    HEADER_TOGGLE_ICON_MARGIN: `${SCALES.XXS}px`,
  },
  MENU: {
    SIDE_MENU_HEIGHT: `calc(100vh - (${globalHeaderHeight} + ${headerBottomMargin}))`,
    SEPARATOR: '2px',
    SEPARATOR_LIGHT: '1px',
    LEFT_MARGIN: `${SCALES.XL}px`,
    LEFT_MARGIN_MOBILE: `${SCALES.M}px`,
    ITEM_PADDING: `${SCALES.XXS}px`,
    ITEM_MARGIN: `${SCALES.S}px`,
    BUTTON_RADIUS: '3px',
    BUTTON_WIDTH: '100%',
    BUTTON_PADDING: `${SCALES.XXS}px`,
    BUTTON_MARGIN_ICON: `${SCALES.XXS}px`,
    LEVEL_PADDING: `${SCALES.XXS}px`,
  },
  BREADCRUMB: {
    CONTENT_PADDING: `${SCALES.M}px`,
    ITEM_MARGIN: `${SCALES.XXS}px`,
    PADDING: `${SCALES.M}px`,
  },
  WINDOW_CONTENT: {
    HEIGHT: `calc(100vh - (${globalHeaderHeight} + ${headerBottomMargin}))`,
    PADDING: `${SCALES.M}px`,
    DIRECTORY_LABEL_LEFT_MARG: `${SCALES.XS}px`,
    DIRECTORY_CARD_WIDTH: '215px',
    DIRECTORY_CARD_PADDING: `${SCALES.M}px`,
    DIRECTORY_CARD_MARGIN: `${SCALES.XS}px`,
    DIRECTORY_ICON_WIDTH: '36px',
    DIRECTORY_ICON_HEIGHT: '36px',
    DIRECTORY_CARD_HEIGHT: '70px',
    DIRECTORY_CARD_INNER_MENU_ICON_SIZE: `${SCALES.XXL}px`,
    DIRECTORY_CARD_INNER_MENU_RIGHT_MARGIN: `${SCALES.L}px`,
    FILE_CARD_MARGIN: `${SCALES.XS}px`,
    FILE_CARD_WIDTH: '215px',
    FILE_CARD_HEIGHT: '200px',
    FILE_CARD_LABEL_HEIGHT: `${SCALES.S}px`,
    FILE_ICON_WIDTH: '64px',
    FILE_ICON_HEIGHT: '64px',
    FILE_DECORATOR_HEIGHT: '140px',
  },
};

export const BREAKPOINTS = {
  mobile: (...styles) => css`
    @media only screen and (max-width: 640px) {
      ${css(...styles)}
    }
  `,
  desktop: (...styles) => css`
    @media only screen and (min-width: 641px) {
      ${css(...styles)}
    }
  `,
};
