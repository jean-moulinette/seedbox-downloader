import { LightThemeSymbol, DarkThemeSymbol } from 'ui/helpers/colors';

export default function getUserTheme() {
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? LightThemeSymbol
    : DarkThemeSymbol;
}
