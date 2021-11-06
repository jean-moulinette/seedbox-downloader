import FileFlatIcon from 'icons/file-flat/component';
import Link from 'next/link';
import React from 'react';
import type { ReactElement } from 'react';
import { APP_SCALES } from 'ui/helpers/scales';

import {
  AnchorContainer,
  DecoratorContainer,
  FileContainer,
  InformationsContainer,
  InnerMenuFloatingContainer,
  LabelContainer,
  SizeContainer,
} from './index.styles';

interface Props {
  label: string
  size: string
  href: string
  innerMenuOptions: ReactElement[]
}

export default function FileCard({
  label,
  href,
  size,
  innerMenuOptions = [],
}: Props): ReactElement {
  return (
    <FileContainer>
      <Link passHref href={href} as={href}>
        <AnchorContainer href={href} title={label}>
          <DecoratorContainer>
            <FileFlatIcon
              width={APP_SCALES.WINDOW_CONTENT.FILE_ICON_WIDTH}
              height={APP_SCALES.WINDOW_CONTENT.FILE_ICON_HEIGHT}
            />
          </DecoratorContainer>
          <InformationsContainer>
            <LabelContainer>
              {label}
            </LabelContainer>
            <SizeContainer>
              {size}
            </SizeContainer>
          </InformationsContainer>
        </AnchorContainer>
      </Link>
      {
        innerMenuOptions.length > 0 && (
          <InnerMenuFloatingContainer className="floating-container">
            { innerMenuOptions }
          </InnerMenuFloatingContainer>
        )
      }
    </FileContainer>
  );
}
