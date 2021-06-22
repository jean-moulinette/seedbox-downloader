import PropTypes from 'prop-types';
import * as React from 'react';

import { Section } from './index.styles';

export default function SideWindow({
  children,
}) {
  return (
    <Section>
      { children }
    </Section>
  );
}

SideWindow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
