import Link from 'next/link';
import React from 'react';
import type { ReactElement } from 'react';
import { APP_SCALES } from 'ui/helpers/scales';

import {
  FolderContainer,
  FullWidthAnchor,
  Icon,
  InnerMenuFloatingContainer,
  LabelContainer,
} from './index.styles';

interface Props {
  label: string
  slug: string
  innerMenuOptions?: ReactElement[]
}

export default function DirectoryCard({
  label,
  slug,
  innerMenuOptions = [],
}: Props) {
  const isRootHref = slug === '';

  const href = isRootHref
    ? '/'
    : `/[...slug]`;
  const asPath = isRootHref
    ? `/`
    :`/${slug}`;

  return (
    <FolderContainer>
      <Link passHref href={href} as={asPath}>
        <FullWidthAnchor title={label}>
          <Icon
            width={APP_SCALES.WINDOW_CONTENT.DIRECTORY_ICON_WIDTH}
            height={APP_SCALES.WINDOW_CONTENT.DIRECTORY_ICON_HEIGHT}
          />
          <LabelContainer>{ label }</LabelContainer>
        </FullWidthAnchor>
      </Link>
      {
        innerMenuOptions.length > 0 && (
          <InnerMenuFloatingContainer className="floating-container">
            { innerMenuOptions }
          </InnerMenuFloatingContainer>
        )
      }
    </FolderContainer>
  );
}
