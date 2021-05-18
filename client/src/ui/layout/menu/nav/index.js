import PropTypes from 'prop-types';
import * as React from 'react';
import styled from 'styled-components';
import { APP_COLORS, APP_SCALES } from 'ui/helpers';
import Loader from 'ui/layout/loader/component';

const Nav = styled.nav`
  box-sizing: border-box;
  height: calc(100vh - (${APP_SCALES.MENU.CONTENT_MARGIN} * 2));
  width: ${APP_SCALES.GLOBAL.SIDE_BAR_WIDTH};
  margin: ${APP_SCALES.MENU.CONTENT_MARGIN} ${APP_SCALES.MENU.CONTENT_MARGIN} 0 ${APP_SCALES.MENU.LEFT_MARGIN};
  padding-bottom: ${APP_SCALES.MENU.CONTENT_MARGIN};
  padding-left: ;
  border-right: solid ${APP_COLORS.MENU.SEPARATOR} ${APP_SCALES.MENU.SEPARATOR};
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 0;
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
      <Loader active={loading} />
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
