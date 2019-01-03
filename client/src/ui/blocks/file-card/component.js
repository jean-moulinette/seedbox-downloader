import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.button`
  box-sizing: border-box;
  background: transparent;
  margin: 10px;
  width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
  border: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition:  box-shadow 0.3s cubic-bezier(.25,.8,.25,1);
  border-radius: 5px;

  &:hover {
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }
`;

const InformationsContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding-top: 20px;
  text-align: left;
`;
const LabelContainer = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const SizeContainer = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const DecoratorContainer = styled.div`
  width: 100%;
  height: 50px;
`;
export default function FileCard({ label, onClick, size }) {
  return (
    <Container onClick={onClick} type="button">
      <DecoratorContainer />
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
