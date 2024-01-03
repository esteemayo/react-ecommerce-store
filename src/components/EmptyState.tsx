'use client';

import styled from 'styled-components';

import { CommonImage } from './CommonImage';

const EmptyState = () => {
  return (
    <Container>
      <Wrapper>
        <StyledImage src={'/img/404.png'} width={500} height={500} alt='404' />
      </Wrapper>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  height: 100vh;

  @media only screen and (max-width: 48em) {
    height: 90vh;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled(CommonImage)`
  width: 50rem;
  height: 50rem;

  @media only screen and (max-width: 25em) {
    width: 40rem;
    height: 40rem;
  }

  @media only screen and (max-width: 18.75em) {
    width: 35rem;
    height: 35rem;
  }
`;

export default EmptyState;
