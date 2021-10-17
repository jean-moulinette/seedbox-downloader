import React from 'react';
import type { ReactElement } from 'react';

import { ButtonLabel, IconContainer, MenuButton, MenuLi } from './index.styles';

interface Props {
  label: string
  active: boolean
  onClick: () => void
  icon: ReactElement
  level: number
}

export default function MenuItem({
  label,
  active,
  onClick,
  icon,
  level,
}: Props) {
  return (
    <MenuLi level={level} key={label}>
      <MenuButton
        active={active}
        title={label}
        onClick={onClick}
      >
        <IconContainer>
          { icon }
        </IconContainer>
        <ButtonLabel>
          {label}
        </ButtonLabel>
      </MenuButton>
    </MenuLi>
  );
}
