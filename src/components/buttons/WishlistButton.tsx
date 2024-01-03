import { useMemo } from 'react';

import { IconButton } from './IconButton';
import HeartIcon from '../icons/HeartIcon';

import useWishlist from '@/hooks/useWishlist';
import { WishlistButtonProps } from '@/types';

const WishlistButton = ({ actionId, product, wished }: WishlistButtonProps) => {
  const { isWished, handleToggle } = useWishlist(actionId, product, wished);

  const wishlistLabel = useMemo(() => {
    if (wished.includes(actionId)) {
      return 'Added to Wishlist';
    }

    return 'Add to Wishlist';
  }, [actionId, wished]);

  return (
    <IconButton onClick={handleToggle}>
      <HeartIcon isWished={isWished} />
      {wishlistLabel}
    </IconButton>
  );
};

export default WishlistButton;
