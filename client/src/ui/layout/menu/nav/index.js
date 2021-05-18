import PropTypes from 'prop-types';
import * as React from 'react';

import Loader from 'ui/layout/loader';

import { Nav, Ul } from './index.styles';

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
