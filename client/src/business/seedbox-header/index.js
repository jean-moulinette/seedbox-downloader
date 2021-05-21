import React from 'react';
import PropTypes from 'prop-types';

import { Layout } from 'ui';
import Blocks from 'ui/blocks';

import ThemeSwitch from './components/theme-switch';
import { ContentContainer } from './index.styles';

export default function SeedboxHeader({
  onThemeChange,
}) {
  return (
    <Layout.Header>
      <ContentContainer>
        <Blocks.Logo />
        <ThemeSwitch
          onChange={onThemeChange}
        />
      </ContentContainer>
    </Layout.Header>
  );
}

SeedboxHeader.propTypes = {
  onThemeChange: PropTypes.func.isRequired,
};
