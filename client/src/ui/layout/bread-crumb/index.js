import * as React from 'react';
import PropTypes from 'prop-types';

import {
  BreadCrumbContainer,
  CrumbItem,
} from './index.styles';

function createElementForItem(item) {
  return (
    <CrumbItem
      active={item.active}
      key={item.key}
      onClick={item.onClick}
    >
      { item.label }
    </CrumbItem>
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
