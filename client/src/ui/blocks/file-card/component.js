import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FileFlatIcon from 'icons/file-flat/component';
import { APP_SCALES } from 'ui/helpers/scales';
import { APP_COLORS } from 'ui/helpers/colors';

const Container = styled.button`
  cursor: pointer;
  box-sizing: border-box;
  background: transparent;
  margin: ${APP_SCALES.WINDOW_CONTENT.FILE_CARD_MARGIN};
  width: ${APP_SCALES.WINDOW_CONTENT.FILE_CARD_WIDTH};
  height: ${APP_SCALES.WINDOW_CONTENT.FILE_CARD_HEIGHT};
  text-overflow: ellipsis;
  overflow: hidden;
  border: none;
  transition:  transform 0.3s cubic-bezier(.25,.8,.25,1);

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

export default function FileCard({ label, onClick, size }) {
  return (
    <Container onClick={onClick} type="button">
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
  onClick: PropTypes.func.isRequired,
};
