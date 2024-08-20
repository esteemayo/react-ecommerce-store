import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { CommonImage } from '../CommonImage';

const EmptyCart = () => {
  return (
    <Container>
      <StyledImage
        src='/svg/empty-cart.svg'
        width={300}
        height={400}
        alt='empty cart'
      />
      <Wrapper>
        <StyledLink to='/products'>
          <Button type='button'>Back to shopping</Button>
        </StyledLink>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 56.25em) {
    min-height: 50vh;
  }
`;

const StyledImage = styled(CommonImage)`
  width: 30rem;
  height: 40rem;
  background-color: transparent;
  object-fit: contain;

  @media only screen and (max-width: 56.25em) {
    height: 33rem;
    padding: 0 5rem;
  }
`;

const Wrapper = styled.div``;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: inherit;
  color: currentColor;
  outline: none;

  &:active {
    color: currentColor;
  }
`;

const Button = styled.button`
  display: inline-block;
  font-weight: 400;
  font-size: 1.5rem;
  padding: 1rem 1.5rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textEmptyCartBtn};
  border: 2px solid ${({ theme }) => theme.textEmptyCartBtn};
  border-radius: 0.5rem;
  outline-color: #85beae;
  margin-top: 2rem;
  cursor: pointer;
`;

export default EmptyCart;
