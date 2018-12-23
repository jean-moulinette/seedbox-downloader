export const SCALES = {
  XL: 40,
  L: 32,
  M: 16,
  S: 14,
  XS: 12,
  XXS: 8,
};

export const APP_SCALES = {
  GLOBAL: {
    SIDE_BAR_WIDTH: '280px',
    APP_PADDING: `${SCALES.XL}px`,
    MAIN_CONTENT_HEIGHT: `calc(100vh - ${SCALES.M}px)`,
  },
  MENU: {
    SEPARATOR: '2px',
    SEPARATOR_LIGHT: '1px',
    CONTENT_PADDING: `${SCALES.M}px`,
    ITEM_PADDING: `${SCALES.XXS}px`,
    ITEM_MARGIN_LEFT: `${SCALES.S}px`,
    BUTTON_RADIUS: '3px',
    BUTTON_WIDTH: '100%',
    BUTTON_PADDING: `${SCALES.XXS}px`,
    BUTTON_MARGIN_ICON: `${SCALES.XXS}px`,
    LEVEL_PADDING: `${SCALES.XXS}px`,
  },
  BREADCRUMB: {
    HEIGHT: `${SCALES.L}px`,
    CONTENT_PADDING: `${SCALES.M}px`,
    ITEM_MARGIN: `${SCALES.XXS}px`,
    PADDING: `${SCALES.XXS}px`,
  },
};
