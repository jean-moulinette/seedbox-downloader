import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { APP_COLORS } from 'ui/helpers/colors';

const Container = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  width: 16px;
  height: 16px;
  padding: 5px;
  margin: 0 5px;
  border-radius: 50%;
  background: ${APP_COLORS.FILE_WINDOW.DIRECTORY_OPTION_BUTTON_BACKGROUND};
  border: 1px ${APP_COLORS.FILE_WINDOW.DIRECTORY_OPTION_BUTTON_BORDER} solid;
  transition: transform 1s cubic-bezier(.25,.8,.25,1);
  z-index: 1;

  &:hover {
    transform: scale(1.15) !important;
  }
`;

const InteractibleButton = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
  margin: 0;
  padding: 0;
  outline: 0;
`;

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
  type: PropTypes.oneOf('anchor', 'button'),
};

FileCardOptionButton.defaultProps = {
  onClick: noop,
  type: 'button',
  href: null,
};
