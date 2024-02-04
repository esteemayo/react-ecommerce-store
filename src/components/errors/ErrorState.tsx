import styled from 'styled-components';

import Heading from '../Heading';
import { useSubmenu } from '../../hooks/useSubmenu';

const ErrorState = () => {
  const closeSubmenu = useSubmenu((state) => state.closeSubmenu);

  return (
    <Container onMouseOver={closeSubmenu}>
      <Wrapper>
        <Image
          src='/svg/qa-engineers.svg'
          width={500}
          height={400}
          alt='error icon'
        />
        <Heading title='Error' subtitle='Something went wrong!' center />
      </Wrapper>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  padding: 10rem 0;

  @media only screen and (max-width: 31.25em) {
    height: 80vh;
  }
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

  @media only screen and (max-width: 31.25em) {
    width: 40rem;
  }

  @media only screen and (max-width: 18.75em) {
    width: 30rem;
  }
`;

export default ErrorState;
