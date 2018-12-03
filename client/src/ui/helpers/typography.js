import { SCALES } from './scales';
import { APP_COLORS } from './colors';

export const FAMILY = {
  ROBOTO: '"Roboto", sans-serif;',
};

export const FONT_STYLES = {
  regular: `
    font-family: ${FAMILY.ROBOTO};
    font-style: normal;
    font-weight: 400;
  `,

  regular_bold: `
    font-family: ${FAMILY.ROBOTO};
    font-style: normal;
    font-weight: 700;
  `,

  regular_light: `
    font-family: ${FAMILY.ROBOTO};
    font-style: normal;
    font-weight: 300;
  `,
};

export const APP_FONT_STYLES = {
  MENU: {
    ITEM: `
      ${FONT_STYLES.regular_bold}
      font-size: ${SCALES.XS}px;
      color: ${APP_COLORS.GLOBAL.TEXT_SECONDARY};
    `,
  },
};
