import styled from 'styled-components';

import { BREAKPOINTS } from 'ui/helpers';

export const DirectoriesContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;

  ${BREAKPOINTS.mobile`
    flex-direction: column;
  `}
`;

export const FilesContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;

  ${BREAKPOINTS.mobile`
    flex-direction: column;
  `}
`;
