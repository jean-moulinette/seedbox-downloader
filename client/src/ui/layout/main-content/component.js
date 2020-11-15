import PropTypes from 'prop-types';
import * as React from 'react';
import styled from 'styled-components';
import { APP_SCALES } from 'ui/helpers';

export default function MainContent({
  children,
}) {
  const Main = styled.main`
    display: flex;
    padding: 0 0 0 ${APP_SCALES.GLOBAL.APP_PADDING};
  `;

  return (
    <Main>
      { children }
    </Main>
  );
}

MainContent.propTypes = {
  children: PropTypes.node.isRequired,
};
