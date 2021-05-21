import React from 'react';

import useTheme from 'hooks/theme';
import SeedboxDownloaderLogoLight from 'icons/seedbox-downloader-logo-light';
import SeedboxDownloaderLogoDark from 'icons/seedbox-downloader-logo-dark';
import { LightThemeSymbol, DarkThemeSymbol } from 'ui/helpers/colors';

export default function Logo() {
  const theme = useTheme();
  const themedIcons = {
    [LightThemeSymbol]: <SeedboxDownloaderLogoLight />,
    [DarkThemeSymbol]: <SeedboxDownloaderLogoDark />,
  };

  return themedIcons[theme];
}
