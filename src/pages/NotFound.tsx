import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useSubmenu } from '../hooks/useSubmenu';
import { CommonImage } from '../components/CommonImage';

const NotFound = () => {
  const closeSubmenu = useSubmenu((state) => state.closeSubmenu);

  return (
    <Container onMouseOver={closeSubmenu}>
      <Wrapper>
        <StyledLink to='/'>
          <Image src='/svg/startled.svg' width={300} height={400} alt='404' />
        </StyledLink>
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

  @media only screen and (max-width: 37.5em) {
    padding-top: 4rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Image = styled(CommonImage)`
  width: 30rem;
  height: 40rem;
  background-color: transparent;
  object-fit: contain;

  @media only screen and (max-width: 25em) {
    width: 40rem;
    height: 40rem;
  }

  @media only screen and (max-width: 18.75em) {
    width: 35rem;
    height: 35rem;
  }
`;

export default NotFound;
