'use client';

import styled from 'styled-components';

import { useCartStore } from '@/hooks/useCartStore';

const CartHeader = () => {
  const qty = useCartStore((state) => state.qty);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <Container>
      <Heading>
        <HeadingMain>My cart</HeadingMain>
        <HeadingSub>{qty}</HeadingSub>
      </Heading>
      <ClearButton type='button' onClick={clearCart}>
        Clear cart
      </ClearButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 5rem 0.5rem 5rem;
  margin-bottom: 3rem;

  @media only screen and (max-width: 43.75em) {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  @media only screen and (max-width: 37.5em) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const Heading = styled.h1`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 2.65rem;
  color: ${({ theme }) => theme.textCartHeader};

  @media only screen and (max-width: 43.75em) {
    font-size: 2rem;
  }

  @media only screen and (max-width: 18.75em) {
    font-size: 1.78rem;
  }
`;

const HeadingMain = styled.span`
  display: inline-block;
  text-transform: capitalize;
  font-weight: 400;
`;

const HeadingSub = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  font-weight: 300;
  font-size: 1.7rem;
  background-color: ${({ theme }) => theme.bgCartHeader};
  color: inherit;
  box-shadow: ${({ theme }) => theme.boxCartHeader};
  -webkit-box-shadow: ${({ theme }) => theme.boxCartHeader};
  -moz-box-shadow: ${({ theme }) => theme.boxCartHeader};
  border-radius: 50%;

  @media only screen and (max-width: 43.75em) {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.5rem;
  }
`;

const ClearButton = styled.button`
  display: inline-block;
  padding: 0.8rem 2.5rem;
  text-transform: capitalize;
  font-size: 1.5rem;
  background-color: transparent;
  color: var(--clr-primary-red);
  border: 1px solid var(--clr-primary-red);
  border-radius: 0.5rem;
  outline-color: #eb4d4d;
  cursor: pointer;
  transition: all 0.3s ease;

  @media only screen and (max-width: 56.25em), only screen and (hover: none) {
    font-size: 1.49rem;
  }

  @media only screen and (max-width: 43.75em) {
    padding-left: 2rem;
    padding-right: 2rem;
    font-size: 1.4rem;
  }

  @media only screen and (max-width: 18.75em) {
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    font-size: 1.37rem;
  }

  &:hover {
    background-color: rgba(222, 10, 10, 0.1);
  }
`;

export default CartHeader;
