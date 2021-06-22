import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { LightThemeSymbol, DarkThemeSymbol, themes } from 'ui/helpers/colors';

function getThemeSymbolByThemeObject(themeObject) {
  return themeObject === themes[LightThemeSymbol]
    ? LightThemeSymbol
    : DarkThemeSymbol;
}

export default function useTheme() {
  const themeObject = useContext(ThemeContext);
  const themeSymbol = getThemeSymbolByThemeObject(themeObject);
  const [currentTheme, setCurrentTheme] = useState(themeSymbol);

  useEffect(() => {
    setCurrentTheme(
      getThemeSymbolByThemeObject(themeObject),
    );
  }, [themeObject]);

  return currentTheme;
}
