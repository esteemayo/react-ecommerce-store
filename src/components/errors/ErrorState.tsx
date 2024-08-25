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
          width={300}
          height={300}
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

  @media only screen and (max-width: 56.25em) {
    height: 80vh;
  }

  @media only screen and (max-width: 31.25em) {
    height: 70vh;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 30rem;
  height: 30rem;
  display: inline-block;
  object-fit: contain;
`;

export default ErrorState;
