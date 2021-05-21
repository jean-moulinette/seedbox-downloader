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
  LOADER: {
    PRIMARY: COLORS.color,
  },
  FILE_WINDOW: {
    DIRECTORY_OPTION_BUTTON_BACKGROUND: COLORS.whiteDark,
    DIRECTORY_OPTION_BUTTON_BORDER: COLORS.blackLight,
    DIRECTORY_COLOR: COLORS.color,
    DIRECTORY_COLOR_SECONDARY: COLORS.colorDark,
    DIRECTORY_COLOR_NESTED_FILE: COLORS.whiteDark,
    FILE_COLOR: COLORS.colorAccentLight,
    FILE_COLOR_SECONDARY: COLORS.colorAccentDark,
  },
  HEADER: {
    SWITCH_HANDLE: COLORS.whiteDark,
    ON_BACKGROUND: COLORS.color,
    OFF_BACKGROUND: COLORS.blackLight,
  },
};

export const LightThemeSymbol = Symbol('light');
export const DarkThemeSymbol = Symbol('dark');

export const themes = {
  [LightThemeSymbol]: {
    textPrimary: COLORS.black,
    textSecondary: COLORS.blackLight,
    background: COLORS.white,
    primaryColor: COLORS.color,
    menu: {
      icon: COLORS.colorDark,
      separator: COLORS.whiteDark,
      active: COLORS.whiteDark,
    },
  },
  [DarkThemeSymbol]: {
    textPrimary: COLORS.white,
    textSecondary: COLORS.whiteDark,
    background: COLORS.black,
    primaryColor: COLORS.color,
    menu: {
      icon: COLORS.colorDark,
      separator: COLORS.blackLight,
      active: COLORS.blackLight,
    },
  },
};
