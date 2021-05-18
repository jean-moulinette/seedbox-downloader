export const COLORS = {
  black: '#212121',
  blackLight: '#989898',
  white: '#FAFAFA',
  whiteDark: '#ededed',
  color: '#9880dd',
  colorLight: '#A48BF0',
  colorDark: '#816DBD',
  colorAccent: '#FF9800',
  colorAccentLight: '#F2AE49',
  colorAccentDark: '#F09000',
};

export const APP_COLORS = {
  GLOBAL: {
    TEXT_PRIMARY: COLORS.black,
    TEXT_SECONDARY: COLORS.blackLight,
    BACKGROUND: COLORS.white,
  },
  MENU: {
    ICON: COLORS.blackLight,
    SEPARATOR: COLORS.whiteDark,
    ACTIVE: COLORS.whiteDark,
  },
  LOADER: {
    PRIMARY: COLORS.color,
  },
  FILE_WINDOW: {
    DIRECTORY_LABEL: COLORS.whiteDark,
    DIRECTORY_OPTION_BUTTON_BACKGROUND: COLORS.whiteDark,
    DIRECTORY_OPTION_BUTTON_BORDER: COLORS.blackLight,
    DIRECTORY_COLOR: COLORS.color,
    DIRECTORY_COLOR_SECONDARY: COLORS.colorDark,
    DIRECTORY_COLOR_NESTED_FILE: COLORS.whiteDark,
    FILE_COLOR: COLORS.colorAccentLight,
    FILE_COLOR_SECONDARY: COLORS.colorAccentDark,
  },
};
