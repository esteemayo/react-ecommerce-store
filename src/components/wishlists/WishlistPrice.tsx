'use client';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useMemo } from 'react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { formatCurrency } from '@/utils/formatCurrency';
import { useCartStore } from '@/hooks/useCartStore';
import { WishlistValues, WislistPriceProps } from '@/types';

import { CommonButton } from '../buttons/CommonButton';

const WishlistPrice = ({ price, wishlist, onAction }: WislistPriceProps) => {
  const cart = useCartStore((state) => state.cart);

  const handleClick = useCallback(
    (wishlist: WishlistValues) => {
      onAction(wishlist);
    },
    [onAction]
  );

  const priceLabel = useMemo(() => {
    return Math.round(price);
  }, [price]);

  const inCart = useMemo(() => {
    const cartItem = cart.find((item) => item.id === wishlist.id);
    return !!cartItem;
  }, [cart, wishlist.id]);

  const btnLabel = useMemo(() => {
    return `${inCart ? 'Added' : 'Add to cart'}`;
  }, [inCart]);

  return (
    <Container>
      <Wrapper>
        <Price>{formatCurrency(priceLabel)}</Price>
        <Button
          type='button'
          disabled={inCart}
          onClick={() => handleClick(wishlist)}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          {btnLabel}
        </Button>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;

  @media only screen and (max-width: 37.5em) {
    width: 100%;
    margin-top: 1rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;

  @media only screen and (max-width: 37.5em) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const Price = styled.span`
  font-weight: 400;
  font-size: 2.23rem;
  color: ${({ theme }) => theme.textProdCard};

  @media only screen and (max-width: 18.75em) {
    font-size: 2rem;
  }
`;

const Button = styled(CommonButton)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  padding: 1rem 1.5rem;

  @media only screen and (max-width: 56.25em), only screen and (hover: none) {
    font-size: 1.47rem;
  }

  @media only screen and (max-width: 18.75em) {
    font-size: 1.4rem;
    padding: 0.8rem 1rem;
  }

  &:disabled {
    opacity: 0.85;
  }

  &:disabled:hover {
    background-position: 0%;
  }

  svg {
    @media only screen and (max-width: 18.75em) {
      font-size: 1.3rem;
    }
  }
`;

export default WishlistPrice;
