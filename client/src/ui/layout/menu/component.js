import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { APP_COLORS } from 'ui/helpers/colors';

export default function Menu({
  items,
}) {
  const menuItems = items.map(({
    label,
  }) => {
    const Label = styled.span`
      color: ${APP_COLORS.TEXT_PRIMARY};
    `;

    return (
      <React.Fragment key={label}>
        <Label>{label}</Label>
      </React.Fragment>
    );
  });

  return (
    <nav>
      { menuItems }
    </nav>
  );
}

Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.element.isRequired,
    separator: PropTypes.boolean,
  })).isRequired,
};
