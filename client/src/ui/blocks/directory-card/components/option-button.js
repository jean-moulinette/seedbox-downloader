import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import * as React from 'react';

import { InteractibleButton, Container } from 'ui/blocks/card-cta/index.styles';

export default function DirectoryCardOptionButton({
  title,
  href,
  onClick,
  icon,
  type,
}) {
  const interactible = type === 'anchor'
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
      {interactible}
    </Container>
  );
}

DirectoryCardOptionButton.defaultProps = {
  href: '#',
  onClick: noop,
  type: 'anchor',
};

DirectoryCardOptionButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['anchor', 'button']),
};
