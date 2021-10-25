import * as React from 'react';
import type { ReactNode } from 'react';

import { GlobalStyle, Main } from './index.styles';

interface Props {
  children: ReactNode
}

export default function MainContent({
  children,
}: Props) {
  return (
    <>
      <GlobalStyle />
      <Main>
        { children }
      </Main>
    </>
  );
}
