import PropTypes from 'prop-types';
import * as React from 'react';

import { Main, GlobalStyle } from './index.styles';

export default function MainContent({
  children,
}) {
  return (
    <>
      <GlobalStyle />
      <Main>
        { children }
      </Main>
    </>
  );
}

MainContent.propTypes = {
  children: PropTypes.node.isRequired,
};
