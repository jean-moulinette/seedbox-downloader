import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

function File({ ...rest }) {
  const theme = useContext(ThemeContext);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...rest} viewBox="0 0 24 24">
      <path fill="none" d="M0 0h24v24H0V0z" />
      <path fill={theme.menu.icon} d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
    </svg>
  );
}

export default File;
