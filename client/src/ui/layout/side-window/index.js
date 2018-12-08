import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { APP_SCALES } from 'ui/helpers';

const Section = styled.section`
  width: 100%;
  height: ${APP_SCALES.GLOBAL.MAIN_CONTENT_HEIGHT};
  padding: ${APP_SCALES.MENU.CONTENT_PADDING} ${APP_SCALES.MENU.CONTENT_PADDING} 0 ${APP_SCALES.MENU.CONTENT_PADDING};
`;

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
