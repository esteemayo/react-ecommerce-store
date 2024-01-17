import styled from 'styled-components';

import { useSubmenu } from '../hooks/useSubmenu';
import { CommonImage } from '../components/CommonImage';

const NotFound = () => {
  const closeSubmenu = useSubmenu((state) => state.closeSubmenu);

  return (
    <Container onMouseOver={closeSubmenu}>
      <Wrapper>
        <StyledImage
          src='/img/startled.svg'
          width={700}
          height={500}
          alt='404'
        />
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

const StyledImage = styled(CommonImage)`
  width: 70rem;
  height: 50rem;
  background-color: transparent;

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
