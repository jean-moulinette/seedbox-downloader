import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React from 'react';

import { InteractibleButton, Container } from 'ui/blocks/card-cta/index.styles';

export default function FileCardOptionButton({
  title,
  href,
  onClick,
  icon,
  type,
}) {
  const interactible = type === 'anchor' && href
    ? (
      <a title={title} href={href}>
        {icon}
      </a>
    )
    : (
      <InteractibleButton title={title} onClick={onClick}>
        {icon}
      </InteractibleButton>
    );

  return (
    <Container>
      { interactible }
    </Container>
  );
}

FileCardOptionButton.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['anchor', 'button']),
};

FileCardOptionButton.defaultProps = {
  onClick: noop,
  type: 'button',
  href: null,
};
