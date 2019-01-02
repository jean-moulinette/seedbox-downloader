import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { APP_COLORS } from 'ui/helpers/colors';

const OverLay = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const LoaderContainer = styled.div`
  & {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
  }
  &::after,&::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: 8px solid #ddd;
    border-radius: 50%;
    display: block;
  }

  &::after {
    content: "";
    border-radius: 50%;
    border-color: ${APP_COLORS.LOADER.PRIMARY};
    border-left-color: transparent;
    animation: load 1s linear infinite;
  }

  &.hidden {
    display: none;
  }

  @keyframes load {
    0% {}
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function Loader({ active = true }) {
  const className = active
    ? ''
    : 'hidden';

  return (
    <OverLay className={className}>
      <LoaderContainer />
    </OverLay>
  );
}

Loader.propTypes = {
  active: PropTypes.bool.isRequired,
};
