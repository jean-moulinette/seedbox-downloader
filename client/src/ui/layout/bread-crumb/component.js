import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { APP_SCALES } from 'ui/helpers/scales';
import { APP_FONT_STYLES } from 'ui/helpers/typography';

const BreadCrumbContainer = styled.div`
  display: flex;
  align-items: stretch;
  white-space: nowrap;
  overflow-x: auto;
`;
const CrumbItem = styled.span`
  ${APP_FONT_STYLES.BREADCRUMB.ITEM}
  padding: ${APP_SCALES.BREADCRUMB.CONTENT_PADDING};
  cursor: pointer;
  margin-right: ${APP_SCALES.BREADCRUMB.ITEM_MARGIN};
}`;
const CrumbItemArrowed = styled(CrumbItem)`
  &::after {
      border-style: solid;
      border-width: 0.15em 0.15em 0 0;
      content: '';
      display: inline-block;
      height: 0.25em;
      left: 1em;
      position: relative;
      top: .5em;
      transform: rotate(45deg);
      vertical-align: top;
      width: 0.25em;
    }
`;
const CrumbItemActive = styled(CrumbItem)`
  ${APP_FONT_STYLES.BREADCRUMB.ITEM_ACTIVE}
`;

function createElementForItem(item) {
  const Item = item.active
    ? CrumbItemActive
    : CrumbItemArrowed;

  return (
    <Item key={item.key} onClick={item.onClick}>
      { item.label }
    </Item>
  );
}

const breadCrumb = function breadCrumb({
  items,
}) {
  const breadCrumbItems = items.map(createElementForItem);

  return (
    <BreadCrumbContainer>
      { breadCrumbItems }
    </BreadCrumbContainer>
  );
};

breadCrumb.defaultProps = {
  items: [],
};

breadCrumb.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  })),
};

export default breadCrumb;
