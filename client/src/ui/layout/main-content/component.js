import PropTypes from 'prop-types';
import * as React from 'react';
import styled from 'styled-components';

export default function MainContent({
  children,
}) {
  const Main = styled.main`
    display: flex;
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
