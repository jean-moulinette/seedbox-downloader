import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { APP_SCALES } from 'ui/helpers';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  box-sizing: border-box;
  height: calc(100% - ${APP_SCALES.BREADCRUMB.MIN_HEIGHT});
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${APP_SCALES.WINDOW_CONTENT.PADDING};
`;

const SideWindowContent = function SideWindowContent({ children }) {
  return (
    <Container>
      {children}
    </Container>
  );
};

SideWindowContent.propTypes = {
  children: PropTypes.node.isRequired,
};


export default SideWindowContent;
