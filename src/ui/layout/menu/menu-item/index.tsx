import Link from 'next/link';
import React from 'react';
import type { ReactElement } from 'react';

import { ButtonLabel, IconContainer, MenuButton, MenuLi } from './index.styles';

interface Props {
  label: string
  active: boolean
  slug: string
  icon: ReactElement
  level: number
}

export default function MenuItem({
  label,
  active,
  slug,
  icon,
  level,
}: Props) {
  const isRootHref = slug === '';

  const href = isRootHref
    ? '/'
    : `/[...slug]`;
  const asPath = isRootHref
    ? `/`
    :`/${slug}`;

  return (
    <MenuLi level={level} key={label}>
      <Link passHref href={href} as={asPath}>
        <MenuButton
          active={active}
          title={label}
        >
          <IconContainer>
            { icon }
          </IconContainer>
          <ButtonLabel>
            {label}
          </ButtonLabel>
        </MenuButton>
      </Link>
    </MenuLi>
  );
}
