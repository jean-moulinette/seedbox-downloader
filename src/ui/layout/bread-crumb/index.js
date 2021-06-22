import * as React from 'react';
import PropTypes from 'prop-types';

import Chevron from 'icons/chevron';

import {
  BreadCrumbContainer,
  CrumbItem,
  ChevronContainer,
} from './index.styles';

const breadCrumb = function breadCrumb({
  items,
}) {
  const breadCrumbItems = items.map((item) => {
    const shouldAppendChevron = !item.active;

    return (
      <React.Fragment key={item.key}>
        <CrumbItem
          active={item.active}
          onClick={item.onClick}
        >
          { item.label }
        </CrumbItem>
        {shouldAppendChevron && (
          <ChevronContainer>
            <Chevron role="img" aria-label="parent folder of" />
          </ChevronContainer>
        )}
      </React.Fragment>
    );
  });

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
