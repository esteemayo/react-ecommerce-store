'use client';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';

import { CartQuantityProps } from '@/types';

const CartQuantity = ({ amount }: CartQuantityProps) => {
  return (
    <Container>
      <Link href='/cart' passHref>
        <FontAwesomeIcon icon={faBagShopping} />
        <CartTotal>{amount}</CartTotal>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  a {
    &:link,
    &:visited {
      text-decoration: none;
      color: ${({ theme }) => theme.bgToggleModeIcon};
      outline-color: var(--clr-primary-green);
    }

    &:active {
      color: currentColor;
    }

    svg {
      font-size: 2.3rem;
      color: currentColor;
    }
  }
`;

const CartTotal = styled.span`
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.bgToggleMode};
  color: var(--clr-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -0.7rem;
  right: -1rem;
  cursor: pointer;
`;

export default CartQuantity;
