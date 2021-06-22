import * as React from 'react';
import PropTypes from 'prop-types';

import { LoaderContainer, OverLay } from './index.styles';

export default function Loader({ active = true }) {
  return (
    <OverLay active={active}>
      <LoaderContainer />
    </OverLay>
  );
}

Loader.propTypes = {
  active: PropTypes.bool.isRequired,
};
