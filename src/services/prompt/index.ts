import 'react-confirm-alert/src/react-confirm-alert.css';

import noop from 'lodash/noop';
import { confirmAlert } from 'react-confirm-alert';

export default function prompt(
  title: string,
  onConfirm: () => void
) {
  confirmAlert({
    title,
    buttons: [
      {
        label: 'Yes',
        onClick: onConfirm,
      },
      {
        label: 'No',
        onClick: noop,
      },
    ],
  });
}
