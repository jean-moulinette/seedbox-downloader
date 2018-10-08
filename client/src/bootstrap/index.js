import * as React from 'react';
import styled from 'styled-components';


export default function appBootstrapper() {
  const HelloText = styled.p`
    font-size: 1.5em;
    color: orange;
  `;

  return (
    <>
      <HelloText>Hello from react</HelloText>
    </>
  );
}
