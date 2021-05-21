import styled, { createGlobalStyle } from 'styled-components';

export const Main = styled.main`
  display: flex;
`;

export const GlobalStyle = createGlobalStyle`
  body {
    transition: background-color 0.3s ease;
    background-color: ${({ theme }) => theme.background}
  }
`;
