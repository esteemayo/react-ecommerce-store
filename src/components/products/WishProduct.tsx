import { useMemo } from 'react';

import { Button } from './Button';
import HeartIcon from '../icons/HeartIcon';

import { useWishlist } from '../../hooks/useWishlist';
import { useCartStore } from '../../hooks/useCartStore';

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
    if (!!currentUser && !!isWished) {
      return 'Wished';
    }
    return 'Wishlist';
  }, [currentUser, isWished]);

  return (
    <Button type='button' onClick={handleToggle}>
      {btnLabel}
      <HeartIcon isWished={isWished} currentUser={currentUser} />
    </Button>
  );
};

export default WishProduct;
