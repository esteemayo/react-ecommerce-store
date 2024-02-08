import { useMemo } from 'react';
import styled from 'styled-components';

import { useWishlist } from '../../hooks/useWishlist';
import { useCartStore } from '../../hooks/useCartStore';

import HeartIcon from '../icons/HeartIcon';
import { WishProductProps } from '../../types';

const WishProduct = ({ actionId, product, currentUser }: WishProductProps) => {
  const wished = useCartStore((state) => state.wished);

  const { isWished, handleToggle } = useWishlist(
    actionId,
    product,
    wished,
    currentUser
  );

  const btnLabel = useMemo(() => {
    return isWished ? 'Wished' : 'Wishlist';
  }, [isWished]);

  return (
    <Button onClick={handleToggle}>
      {btnLabel}
      <HeartIcon isWished={isWished} />
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  width: 100%;
  padding: 2rem 1rem;
  font-size: 1.8rem;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.colCrumbs};
  border-radius: 0.5rem;
  line-height: 1.3em;
  outline-color: #eee;
  margin-bottom: 3rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.text};
  }

  svg {
    font-size: inherit;
    color: currentColor;
  }
`;

export default WishProduct;