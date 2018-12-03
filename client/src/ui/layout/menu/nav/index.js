import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Layout } from 'ui';
import { APP_COLORS, APP_SCALES } from 'ui/helpers';

const Nav = styled.nav`
  width: ${APP_SCALES.GLOBAL.SIDE_BAR_WIDTH};
  height: calc(70vh);
  padding: ${APP_SCALES.MENU.CONTENT_PADDING};
  border-right: solid ${APP_COLORS.MENU.SEPARATOR} ${APP_SCALES.MENU.SEPARATOR};
  overflow: scroll;
  overflow-x: hidden;
`;
const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  `;

export default function Menu({
  children,
  loading,
}) {
  const listContent = loading
    ? null
    : (
      <Ul>
        { children }
      </Ul>
    );

  return (
    <Nav>
      <Layout.Loader active={loading} />
      { listContent }
    </Nav>
  );
}

Menu.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
