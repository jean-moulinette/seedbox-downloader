import * as React from 'react';

import { APP_COLORS } from 'ui/helpers/colors';
import DownloadFolderIcon from 'icons/folder-download/component';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 16px;
  height: 16px;
  padding: 5px;
  border-radius: 50%;
  background-color: ${APP_COLORS.DIRECTORY_OPTION_BUTTON_BACKGROUND};
  border: 1px ${APP_COLORS.DIRECTORY_OPTION_BUTTON_BORDER} solid;
`;

const OptionButton = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0;
`;

export default function DownloadOption({ title, downloadFunction }) {
  return (
    <Container>
      <OptionButton type="button" title={title} onClick={downloadFunction}>
        <DownloadFolderIcon width="16px" height="16px" />
      </OptionButton>
    </Container>
  );
}

DownloadOption.propTypes = {
  title: PropTypes.string.isRequired,
  downloadFunction: PropTypes.func.isRequired,
};
