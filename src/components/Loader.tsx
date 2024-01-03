'use client';

import styled from 'styled-components';

import Spinner from './Spinner';

interface LoaderProps {
  size?: string;
}

const Loader = ({ size }: LoaderProps) => {
  return (
    <Container>
      <Wrapper>
        <Spinner size={size} />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100%;
  background-color: ${({ theme }) => theme.bgOverlay};
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4000;
`;

const Wrapper = styled.div`
  width: 40rem;
  height: 30rem;
  background-color: ${({ theme }) => theme.bgModal};
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Loader;
