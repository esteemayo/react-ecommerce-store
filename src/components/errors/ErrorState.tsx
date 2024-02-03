import styled from 'styled-components';

import Heading from '../Heading';

const ErrorState = () => {
  return (
    <Container>
      <Wrapper>
        <Image
          src='/svg/qa-engineers.svg'
          width={500}
          height={400}
          alt='error icon'
        />
        <Heading title='Uh oh' subtitle='Something went wrong!' center />
      </Wrapper>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  place-items: center;
`;

const Image = styled.img`
  width: 50rem;
  height: 40rem;
  display: inline-block;
  object-fit: contain;
`;

export default ErrorState;
