import styled from 'styled-components';

import { APP_FONT_STYLES, APP_SCALES } from 'ui/helpers';

export const MenuLi = styled('li')`
  padding-top: ${APP_SCALES.MENU.ITEM_PADDING};
  padding-bottom: ${APP_SCALES.MENU.ITEM_PADDING};
  transition: border-left 0.3s ease;
  margin-right: ${APP_SCALES.MENU.ITEM_MARGIN};

  ${({ level }) => `
    padding-left: calc(${APP_SCALES.MENU.LEVEL_PADDING} * ${level});
    margin-left: calc(${APP_SCALES.MENU.ITEM_MARGIN} * ${level});
  `}

  ${({ level, theme }) => level > 0 && `
    border-left: solid ${theme.menu.separator} ${APP_SCALES.MENU.SEPARATOR};
  `}
`;

export const MenuButton = styled('button')`
  ${({ theme }) => APP_FONT_STYLES.MENU.ITEM(theme)}
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
    background-color: ${({ theme }) => theme.menu.active};
  `}

  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
  &:hover {
    background: ${({ theme }) => theme.menu.active};
  }
`;

export const ButtonLabel = styled('span')`
  margin-left: ${APP_SCALES.MENU.BUTTON_MARGIN_ICON};
  vertical-align: middle;
`;
