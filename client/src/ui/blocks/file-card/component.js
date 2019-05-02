import * as React from 'react';

import { APP_COLORS } from 'ui/helpers/colors';
import { APP_FONT_STYLES } from 'ui/helpers/typography';
import { APP_SCALES } from 'ui/helpers/scales';
import FileFlatIcon from 'icons/file-flat/component';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.a`
  box-sizing: border-box;
  background: transparent;
  margin: ${APP_SCALES.WINDOW_CONTENT.FILE_CARD_MARGIN};
  width: ${APP_SCALES.WINDOW_CONTENT.FILE_CARD_WIDTH};
  height: ${APP_SCALES.WINDOW_CONTENT.FILE_CARD_HEIGHT};
  border: none;
  transition:  transform 0.3s cubic-bezier(.25,.8,.25,1);
  overflow: hidden;
  text-overflow: ellipsis;
  ${APP_FONT_STYLES.FILE_WINDOW.FILE_LABEL}

  &:hover {
    transform: scale(1.1)
  }

  &:focus {
    outline: 0;
  }
`;

const InformationsContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 10px 0;
  text-align: left;
`;
const LabelContainer = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-top: 5px;
`;
const SizeContainer = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-top: 5px;
  overflow: hidden;
`;
const DecoratorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${APP_SCALES.WINDOW_CONTENT.FILE_DECORATOR_HEIGHT};
  background: ${APP_COLORS.LOADER.PRIMARY};
  border-radius: 5px;
`;

export default function FileCard({ label, href, size }) {
  return (
    <Container href={href} title={label}>
      <DecoratorContainer>
        <FileFlatIcon
          width={APP_SCALES.WINDOW_CONTENT.FILE_ICON_WIDTH}
          height={APP_SCALES.WINDOW_CONTENT.FILE_ICON_HEIGHT}
        />
      </DecoratorContainer>
      <InformationsContainer>
        <LabelContainer>
          { label }
        </LabelContainer>
        <SizeContainer>
          { size }
        </SizeContainer>
      </InformationsContainer>
    </Container>
  );
}

FileCard.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};
