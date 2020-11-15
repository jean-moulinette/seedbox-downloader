import FileFlatIcon from 'icons/file-flat/component';
import PropTypes from 'prop-types';
import * as React from 'react';
import styled from 'styled-components';
import { APP_COLORS } from 'ui/helpers/colors';
import { APP_SCALES } from 'ui/helpers/scales';
import { APP_FONT_STYLES } from 'ui/helpers/typography';

const FileContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  width: ${APP_SCALES.WINDOW_CONTENT.FILE_CARD_WIDTH};
  height: ${APP_SCALES.WINDOW_CONTENT.FILE_CARD_HEIGHT};
  margin: ${APP_SCALES.WINDOW_CONTENT.FILE_CARD_MARGIN};
  overflow: hidden;
  text-overflow: ellipsis;
  transition:  transform 0.3s cubic-bezier(.25,.8,.25,1);

  &>.floating-container {
    &>div {
      transition: transform 1.2s cubic-bezier(.25,.8,.25,1);
      transform: rotate(180deg);
    }
  }

  &:hover {
    transform: scale(1.1);

    &>.floating-container {
      opacity: 1;
      transform: translateY(-45px);

      &>div {
        transform: rotate(0deg);
      }
    }
  }
`;

const AnchorContainer = styled.a`
  position: relative;
  background: transparent;
  border: none;
  ${APP_FONT_STYLES.FILE_WINDOW.FILE_LABEL}

  &:focus {
    outline: 0;
  }
`;

const InnerMenuFloatingContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  opacity: 0;
  transition: 1s cubic-bezier(.25,.8,.25,1);
  transition-property: transform opacity;
  transform: translateY(0px);
`;

const InformationsContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 10px 0;
  text-align: left;
`;
const LabelContainer = styled.span`
  display: inline-block;
  width: 100%;
  height: ${APP_SCALES.WINDOW_CONTENT.FILE_CARD_LABEL_HEIGHT};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const SizeContainer = styled.span`
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
            { label }
          </LabelContainer>
          <SizeContainer>
            { size }
          </SizeContainer>
        </InformationsContainer>
      </AnchorContainer>
      {
        innerMenuOptions.length > 0 && (
          <InnerMenuFloatingContainer className="floating-container">
            {/* eslint-disable-next-line react/no-array-index-key */}
            { innerMenuOptions }
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
