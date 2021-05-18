import styled from 'styled-components';

import { APP_COLORS } from 'ui/helpers/colors';

export const OverLay = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;

  ${({ active }) => !active && `
    display: none;
  `}
`;

export const LoaderContainer = styled('div')`
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
