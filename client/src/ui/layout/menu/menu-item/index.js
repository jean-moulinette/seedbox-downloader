import * as React from 'react';
import PropTypes from 'prop-types';

import { MenuLi, MenuButton, ButtonLabel } from './index.styles';

export default function MenuItem({
  label,
  active,
  onClick,
  icon,
  level,
  separator,
}) {
  return (
    <MenuLi separator={separator} level={level} key={label}>
      <MenuButton
        active={active}
        title={label}
        onClick={onClick}
      >
        { icon }
        <ButtonLabel>
          {label}
        </ButtonLabel>
      </MenuButton>
    </MenuLi>
  );
}

MenuItem.defaultProps = {
  onClick: () => {},
  separator: false,
};

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.element.isRequired,
  level: PropTypes.number.isRequired,
  separator: PropTypes.bool,
};
