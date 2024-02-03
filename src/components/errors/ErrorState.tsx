import styled from 'styled-components';

import Heading from '../Heading';

const ErrorState = () => {
  return (
    <Container>
      <Image
        src='/svg/qa-engineers.svg'
        width={500}
        height={400}
        alt='error icon'
      />
      <Heading title='Uh oh' subtitle='Something went wrong!' center />
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
`;

const Image = styled.img`
  width: 50rem;
  height: 40rem;
`;

export default ErrorState;
