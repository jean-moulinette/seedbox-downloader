import React from 'react';
import PropTypes from 'prop-types';

import { Layout } from 'ui';
import Blocks from 'ui/blocks';
import { registerThemeSelectionToStorage } from 'services/local-storage/theme';

import ThemeSwitch from './components/theme-switch';
import { ContentContainer } from './index.styles';

export default function SeedboxHeader({
  onThemeChange,
}) {
  const handleThemeChange = (selection) => {
    registerThemeSelectionToStorage(selection);
    onThemeChange(selection);
  };

  return (
    <Layout.Header>
      <ContentContainer>
        <Blocks.Logo />
        <ThemeSwitch
          onChange={handleThemeChange}
        />
      </ContentContainer>
    </Layout.Header>
  );
}

SeedboxHeader.propTypes = {
  onThemeChange: PropTypes.func.isRequired,
};
