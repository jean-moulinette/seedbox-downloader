import * as React from 'react';
import { APP_COLORS } from 'ui/helpers';

const Folder = ({ ...rest }) => (
  <svg {...rest} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m2 1033.4c-1.1046 0-2 0.9-2 2v14c0 1.1 0.89543 2 2 2h20c1.105 0 2-0.9 2-2v-14c0-1.1-0.895-2-2-2h-20z"
      fill={APP_COLORS.FILE_WINDOW.DIRECTORY_COLOR}
      transform="translate(0 -1028.4)"
    />
    <path
      d="m3 1029.4c-1.1046 0-2 0.9-2 2v14c0 1.1 0.8954 2 2 2h11 5 2c1.105 0 2-0.9 2-2v-9-3c0-1.1-0.895-2-2-2h-2-5-1l-3-2h-7z"
      fill={APP_COLORS.FILE_WINDOW.DIRECTORY_COLOR}
      transform="translate(0 -1028.4)"
    />
    <path
      d="m23 1042.4v-8c0-1.1-0.895-2-2-2h-11-5-2c-1.1046 0-2 0.9-2 2v8h22z"
      fill={APP_COLORS.FILE_WINDOW.DIRECTORY_COLOR_NESTED_FILE}
      transform="translate(0 -1028.4)"
    />
    <path
      d="m2 1033.4c-1.1046 0-2 0.9-2 2v6 1 6c0 1.1 0.89543 2 2 2h20c1.105 0 2-0.9 2-2v-6-1-6c0-1.1-0.895-2-2-2h-20z"
      fill={APP_COLORS.FILE_WINDOW.DIRECTORY_COLOR_SECONDARY}
      transform="translate(0 -1028.4)"
    />
  </svg>
);

export default Folder;
