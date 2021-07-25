import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { DarkThemeSymbol, LightThemeSymbol, themes } from 'ui/helpers/colors';
import type { ThemeSymbol } from 'ui/helpers/colors';

type ThemeObject = typeof themes[ThemeSymbol]

function getThemeSymbolByThemeObject(themeObject: ThemeObject) {
  return themeObject === themes[LightThemeSymbol]
    ? LightThemeSymbol
    : DarkThemeSymbol;
}

export default function useTheme() {
  const themeObject = useContext<ThemeObject>(ThemeContext);
  const themeSymbol = getThemeSymbolByThemeObject(themeObject);
  const [currentTheme, setCurrentTheme] = useState(themeSymbol);

  useEffect(() => {
    setCurrentTheme(
      getThemeSymbolByThemeObject(themeObject),
    );
  }, [themeObject]);

  return currentTheme;
}
