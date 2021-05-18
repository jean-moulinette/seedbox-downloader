import FileFlatIcon from 'icons/file-flat/component';
import PropTypes from 'prop-types';
import * as React from 'react';

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

export default function FileCard({
  label,
  href,
  size,
  innerMenuOptions,
}) {
  return (
    <FileContainer>
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
      {
        innerMenuOptions.length > 0 && (
          <InnerMenuFloatingContainer className="floating-container">
            {/* eslint-disable-next-line react/no-array-index-key */}
            { innerMenuOptions}
          </InnerMenuFloatingContainer>
        )
      }
    </FileContainer>
  );
}

FileCard.defaultProps = {
  innerMenuOptions: [],
};

FileCard.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  innerMenuOptions: PropTypes.arrayOf(PropTypes.element),
};
