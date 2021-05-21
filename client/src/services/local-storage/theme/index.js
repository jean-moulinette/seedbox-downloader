import { LightThemeSymbol, DarkThemeSymbol } from 'ui/helpers/colors';

const localStorageKey = 'theme';

const themeSymbolsToStringMap = {
  [LightThemeSymbol]: 'light',
  [DarkThemeSymbol]: 'dark',
};

const themeStringsToSymbolMap = {
  light: LightThemeSymbol,
  dark: DarkThemeSymbol,
};

export function registerThemeSelectionToStorage(selection) {
  localStorage.setItem(localStorageKey, themeSymbolsToStringMap[selection]);
}

export function getThemeSelectionFromStorage() {
  const savedTheme = localStorage.getItem(localStorageKey);

  return savedTheme
    ? themeStringsToSymbolMap[savedTheme]
    : null;
}
