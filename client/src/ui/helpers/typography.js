export const FAMILY = {
  ROBOTO: '"Roboto", sans-serif;',
};

export const FONT_STYLES = {
  regular: `
    font-family: ${FAMILY.ROBOTO};
    font-style: normal;
    font-weight: 400;
    text-decoration: none;
  `,

  regular_bold: `
    font-family: ${FAMILY.ROBOTO};
    font-style: normal;
    font-weight: 700;
    text-decoration: none;
  `,

  regular_light: `
    font-family: ${FAMILY.ROBOTO};
    font-style: normal;
    font-weight: 300;
    text-decoration: none;
  `,
};

export const APP_FONT_STYLES = {
  HEADER: {
    THEME_SWITCH_ICON: `
      font-size: 1.2em;
    `,
  },
  MENU: {
    ITEM: (theme) => `
      ${FONT_STYLES.regular}
      font-size: .8em;
      transition: color 0.3s ease;
      color: ${theme.textPrimary};
    `,
  },
  BREADCRUMB: {
    ITEM: (theme) => `
      ${FONT_STYLES.regular}
      font-size: 1.15em;
      transition: color 0.3s ease;
      color: ${theme.textSecondary};
    `,
    ITEM_ACTIVE: (theme) => `
      ${FONT_STYLES.regular}
      font-size: 1.15em;
      color: ${theme.textPrimary};
    `,
  },
  FILE_WINDOW: {
    DIRECTORY_LABEL: (theme) => `
      ${FONT_STYLES.regular};
      transition: color 0.3s ease;
      color: ${theme.textPrimary};
      font-size: .85em;
    `,
    FILE_LABEL: (theme) => `
      ${FONT_STYLES.regular};
      transition: color 0.3s ease;
      color: ${theme.textPrimary};
      font-size: .8em;
  `,
  },
};
