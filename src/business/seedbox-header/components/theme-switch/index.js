import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';

import { LightThemeSymbol, DarkThemeSymbol, APP_COLORS } from 'ui/helpers/colors';
import useTheme from 'hooks/theme';

import { SwitchContainer, SwitchIconContainer, ToggleContainer } from './index.styles';

export default function ThemeSwitch({
  onChange,
}) {
  const themeObject = useContext(ThemeContext);
  const currentTheme = useTheme();
  const isLightThemeChecked = currentTheme === LightThemeSymbol;
  const nextTheme = isLightThemeChecked
    ? DarkThemeSymbol
    : LightThemeSymbol;
  const boxShadow = `0px 1px 5px ${themeObject.textPrimary}80`;

  return (
    <SwitchContainer>
      <SwitchIconContainer role="img" aria-label="light-theme-checked">
        🌙
      </SwitchIconContainer>
      <ToggleContainer>
        <Switch
          aria-label="Switch theme toggle"
          onChange={() => onChange(nextTheme)}
          handleDiameter={30}
          boxShadow={boxShadow}
          activeBoxShadow="none"
          onColor={APP_COLORS.HEADER.ON_BACKGROUND}
          offColor={APP_COLORS.HEADER.OFF_BACKGROUND}
          onHandleColor={APP_COLORS.HEADER.SWITCH_HANDLE}
          offHandleColor={APP_COLORS.HEADER.SWITCH_HANDLE}
          checked={isLightThemeChecked}
          checkedIcon={null}
          uncheckedIcon={null}
        />
      </ToggleContainer>
      <SwitchIconContainer role="img" aria-label="dark-theme-checked">
        ☀️
      </SwitchIconContainer>
    </SwitchContainer>
  );
}

ThemeSwitch.propTypes = {
  onChange: PropTypes.func.isRequired,
};
