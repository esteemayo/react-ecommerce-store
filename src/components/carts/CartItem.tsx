'use client';

import styled from 'styled-components';
import { useCallback } from 'react';

import CartInfo from './CartInfo';
import CartCounter from './CartCounter';

import { CartItemProps } from '@/types';
import { useCartStore } from '@/hooks/useCartStore';

const CartItem = ({
  id,
  name,
  size,
  color,
  images,
  price,
  quantity,
}: CartItemProps) => {
  const remove = useCartStore((state) => state.remove);
  const toggleQuantity = useCartStore((state) => state.toggleQuantity);

  const handleRemove = useCallback(
    (id: string) => {
      remove(id);
    },
    [remove]
  );

  const handleToggle = useCallback(
    (type: string) => {
      toggleQuantity({ type, id });
    },
    [id, toggleQuantity]
  );

  return (
    <Container>
      <Wrapper>
        <CartInfo
          id={id}
          color={color}
          name={name}
          image={images[0]}
          price={price}
          size={size}
          onAction={handleRemove}
        />
        <CartCounter
          value={quantity}
          onIncrement={handleToggle}
          onDecrement={handleToggle}
        />
      </Wrapper>
    </Container>
  );
};

const Container = styled.article`
  line-height: 1.12;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.cartBorder};
    margin-bottom: 1.25rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.25rem;

  @media only screen and (max-width: 31.25em) {
    flex-direction: column;
    gap: 2rem;
  }
`;

export default CartItem;
