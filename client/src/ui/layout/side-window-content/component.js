import PropTypes from 'prop-types';
import * as React from 'react';
import styled from 'styled-components';
import { APP_SCALES } from 'ui/helpers';

const Container = styled.div`
  box-sizing: border-box;
  height: calc(100vh - ${APP_SCALES.GLOBAL.SIBEBAR_HEIGHT_OVERFLOW} - ${APP_SCALES.WINDOW_CONTENT.PADDING});
  overflow-y: auto;
  overflow-x: hidden;
  margin: ${APP_SCALES.WINDOW_CONTENT.PADDING} 0 0 ${APP_SCALES.WINDOW_CONTENT.PADDING};
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
