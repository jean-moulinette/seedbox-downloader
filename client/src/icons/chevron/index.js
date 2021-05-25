import React from 'react';

const Chevron = (props) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 14.5L11.5 8 5 1.5"
      stroke="#9880DD"
      strokeWidth={2.14}
      strokeLinecap="round"
    />
  </svg>
);

export default Chevron;
