import PropTypes from 'prop-types';
import * as React from 'react';

import { Main } from './index.styles';

export default function MainContent({
  children,
}) {
  return (
    <Main>
      { children }
    </Main>
  );
}

MainContent.propTypes = {
  children: PropTypes.node.isRequired,
};
