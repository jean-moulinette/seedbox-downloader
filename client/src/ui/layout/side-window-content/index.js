import PropTypes from 'prop-types';
import * as React from 'react';

import { Container } from './index.styles';

const SideWindowContent = function SideWindowContent({ children }) {
  return (
    <Container>
      {children}
    </Container>
  );
};

SideWindowContent.propTypes = {
  children: PropTypes.node,
};

SideWindowContent.defaultProps = {
  children: null,
};

export default SideWindowContent;
