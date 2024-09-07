import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Heading from '../components/Heading';
import { CommonImage } from '../components/CommonImage';

import { useSubmenu } from '../hooks/useSubmenu';

const NotFound = () => {
  const closeSubmenu = useSubmenu((state) => state.closeSubmenu);

  return (
    <Container onMouseOver={closeSubmenu}>
      <Wrapper>
        <StyledLink to='/'>
          <Image src='/svg/startled.svg' width={300} height={400} alt='404' />
        </StyledLink>
        <Heading title='Uh oh!' subtitle='Page not found...' center />
      </Wrapper>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  min-height: 80vh;
  background-color: ${({ theme }) => theme.bg};
  padding-top: 8rem;
  padding-bottom: 4rem;

  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 37.5em) {
    padding-top: 4rem;
  }

  @media only screen and (max-width: 30em) {
    min-height: 70vh;
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

const StyledLink = styled(Link)`
  text-decoration: none;
  outline: none;
`;

const Image = styled(CommonImage)`
  width: 30rem;
  height: 40rem;
  background-color: transparent;
  object-fit: contain;

  @media only screen and (min-width: 112.5em) {
    width: 40rem;
    height: 45rem;
  }
`;

export default NotFound;
