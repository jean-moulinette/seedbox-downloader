import { DarkThemeSymbol, LightThemeSymbol } from 'ui/helpers/colors';
import type { ThemeSymbol } from 'ui/helpers/colors';

const THEME_STORAGE_KEY = 'theme';

const themeSymbolsToStringMap = {
  [LightThemeSymbol]: 'light',
  [DarkThemeSymbol]: 'dark',
};

const themeStringsToSymbolMap = {
  light: LightThemeSymbol,
  dark: DarkThemeSymbol,
};

export function registerThemeSelectionToStorage(selection: ThemeSymbol) {
  localStorage.setItem(THEME_STORAGE_KEY, themeSymbolsToStringMap[selection]);
}

export function getThemeSelectionFromStorage() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme) {
    return themeStringsToSymbolMap[savedTheme as keyof typeof themeStringsToSymbolMap] as ThemeSymbol;
  }

  return null;
}
