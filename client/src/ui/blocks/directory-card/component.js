import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.button`
  box-sizing: border-box;
  padding: 24px;
  background: transparent;
  margin: 10px;
  width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
  border: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition:  box-shadow 0.3s cubic-bezier(.25,.8,.25,1);
  border-radius: 3px;

  &:hover {
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }
`;

export default function DirectoryCard({ label, onClick }) {
  return (
    <Container onClick={onClick} type="button">
      { label }
    </Container>
  );
}

DirectoryCard.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
