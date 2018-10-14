import * as React from 'react';
import PropTypes from 'prop-types';

export default function MainContent({
  children,
}) {
  return (
    <main>
      { children }
    </main>
  );
}

MainContent.propTypes = {
  children: PropTypes.node.isRequired,
};
