import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { CommonImage } from '../CommonImage';

const Logo = () => {
  return (
    <Container>
      <StyledLink to='/'>
        <StyledImage src='/img/logo.png' width={100} height={50} alt='' />
      </StyledLink>
    </Container>
  );
};

const Container = styled.div``;

const StyledLink = styled(Link)`
  text-decoration: none;
  outline-color: ${({ theme }) => theme.navOut};
`;

const StyledImage = styled(CommonImage)`
  width: 10rem;
  height: 5rem;
  background-color: transparent;
`;

export default Logo;
