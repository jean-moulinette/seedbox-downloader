import React from 'react';
import PropTypes from 'prop-types';

import { Header } from './index.styles';

export default function LayoutHeader({
  children,
}) {
  return (
    <Header>
      {children}
    </Header>
  );
}

LayoutHeader.propTypes = {
  children: PropTypes.node.isRequired,
};
