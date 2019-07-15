import * as React from 'react';

import { APP_COLORS } from 'ui/helpers/colors';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import noop from 'lodash/noop';

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

export default function DirectoryCardOptionButton({ title, href, onClick, icon, type }) {

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
}

DirectoryCardOptionButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['anchor', 'button']),
};
