'use client';

import styled from 'styled-components';
import Link from 'next/link';

import { CommonImage } from '../CommonImage';

const EmptyCart = () => {
  return (
    <Container>
      <StyledImage src='/img/empty-cart.png' width={400} height={400} alt='' />
      <StyledLink href='/products'>
        <Button type='button'>Back to shopping</Button>
      </StyledLink>
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
  width: 40rem;
  height: 40rem;

  @media only screen and (max-width: 56.25em) {
    width: 33rem;
    height: 33rem;
  }
`;

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
  padding: 1rem 0.5rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textEmptyCartBtn};
  border: 2px solid ${({ theme }) => theme.textEmptyCartBtn};
  border-radius: 0.5rem;
  outline-color: #85beae;
  margin-top: 2rem;
  cursor: pointer;
`;

export default EmptyCart;
