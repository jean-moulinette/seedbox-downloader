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
  background: ${APP_COLORS.FILE_WINDOW.DIRECTORY_OPTION_BUTTON_BACKGROUND};
  border: 1px ${APP_COLORS.FILE_WINDOW.DIRECTORY_OPTION_BUTTON_BORDER} solid;
`;

export default function DownloadOption({ title, href }) {
  return (
    <Container>
      <a title={title} href={href}>
        <DownloadFolderIcon width="16px" height="16px" />
      </a>
    </Container>
  );
}

DownloadOption.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};
