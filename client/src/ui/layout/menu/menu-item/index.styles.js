import styled from 'styled-components';

import { APP_FONT_STYLES, APP_COLORS, APP_SCALES } from 'ui/helpers';

export const MenuLi = styled('li')`
  padding-top: ${APP_SCALES.MENU.ITEM_PADDING};
  padding-bottom: ${APP_SCALES.MENU.ITEM_PADDING};

  ${({ level }) => `
    padding-left: calc(${APP_SCALES.MENU.LEVEL_PADDING} * ${level});
    margin-left: calc(${APP_SCALES.MENU.ITEM_MARGIN_LEFT} * ${level});
  `}

  ${({ separator }) => separator && `
    border-top: solid ${APP_COLORS.MENU.SEPARATOR} ${APP_SCALES.MENU.SEPARATOR_LIGHT};
  `}

  ${({ level }) => level > 0 && `
    border-left: solid ${APP_COLORS.MENU.SEPARATOR} ${APP_SCALES.MENU.SEPARATOR};
  `}
`;

export const MenuButton = styled('button')`
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

  ${({ active }) => active && `
    background-color: ${APP_COLORS.MENU.ACTIVE};
  `}

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

export const ButtonLabel = styled('span')`
  margin-left: ${APP_SCALES.MENU.BUTTON_MARGIN_ICON};
  vertical-align: middle;
`;
