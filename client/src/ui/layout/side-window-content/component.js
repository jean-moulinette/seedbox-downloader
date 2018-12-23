import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { APP_SCALES } from 'ui/helpers';

const Container = styled.div`
  height: calc(100% - ${APP_SCALES.BREADCRUMB.HEIGHT});
  overflow-y: auto;
  overflow-x: hidden;
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
