import React from 'react';

function Icon({ ...props }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.6'
      className='feather feather-x'
      viewBox='0 0 24 24'
      {...props}
    >
      <path d='M18 6L6 18' />
      <path d='M6 6L18 18' />
    </svg>
  );
}

export default Icon;
