import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { APP_FONT_STYLES, APP_COLORS, APP_SCALES } from 'ui/helpers';

const Nav = styled.nav`
  width: ${APP_SCALES.GLOBAL.SIDE_BAR_WIDTH};
  height: calc(70vh);
  padding: ${APP_SCALES.MENU.CONTENT_PADDING};
  border-right: solid ${APP_COLORS.MENU.SEPARATOR} ${APP_SCALES.MENU.SEPARATOR};
  overflow: scroll;
  overflow-x: hidden;
`;
const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  `;
const MenuLi = styled.li`
  padding-top: ${APP_SCALES.MENU.ITEM_PADDING};
  padding-bottom: ${APP_SCALES.MENU.ITEM_PADDING};
  `;
const MenuButton = styled.button`
  ${APP_FONT_STYLES.MENU.ITEM}
  width: ${APP_SCALES.MENU.BUTTON_WIDTH};
  height: 100%;
  padding: ${APP_SCALES.MENU.BUTTON_PADDING};
  border: none;
  border-radius: ${APP_SCALES.MENU.BUTTON_RADIUS};
  background: none;
  text-align: left;
  transition: background 100ms cubic-bezier(0.4, 0.0, 0.2, 1);
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
  &:hover {
    background: ${APP_COLORS.MENU.ACTIVE}
  }
`;

export default function Menu({
  items,
}) {
  const menuItems = items.map(({
    label,
    onClick,
    separator,
    active,
    icon,
    level,
  }) => {
    const buttonBackgroundColor = active ? APP_COLORS.MENU.ACTIVE : 'none';
    const liBorderLeft = level > 0
      ? `border-left: solid ${APP_COLORS.MENU.SEPARATOR} ${APP_SCALES.MENU.SEPARATOR};`
      : 'border-left: none;';

    const Li = separator
      ? styled(MenuLi)`
          margin-left: calc(${APP_SCALES.MENU.ITEM_MARGIN_LEFT} * ${level});
          border-top: solid ${APP_COLORS.MENU.SEPARATOR} ${APP_SCALES.MENU.SEPARATOR};
          padding-left: calc(${APP_SCALES.MENU.LEVEL_PADDING} * ${level});
          ${liBorderLeft}
        `
      : styled(MenuLi)`
          margin-left: calc(${APP_SCALES.MENU.ITEM_MARGIN_LEFT} * ${level});
          padding-left: calc(${APP_SCALES.MENU.LEVEL_PADDING} * ${level});
          ${liBorderLeft}
      `;

    const Button = styled(MenuButton)`
      background: ${buttonBackgroundColor};
    `;
    const ButtonLabel = styled.span`
      margin-left: ${APP_SCALES.MENU.BUTTON_MARGIN_ICON};
      vertical-align: bottom;
    `;

    return (
      <Li key={label}>
        <Button
          title={label}
          onClick={onClick}
        >
          { icon }
          <ButtonLabel>
            {label}
          </ButtonLabel>
        </Button>
      </Li>
    );
  });

  return (
    <Nav>
      <Ul>
        { menuItems }
      </Ul>
    </Nav>
  );
}

Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    icon: PropTypes.element.isRequired,
    level: PropTypes.number.isRequired,
    separator: PropTypes.boolean,
  })).isRequired,
};
