import { useMemo } from 'react';

import { IconButton } from './IconButton';
import HeartIcon from '../icons/HeartIcon';

import { WishlistButtonProps } from '../../types';
import { useWishlist } from '../../hooks/useWishlist';

const WishlistButton = ({
  actionId,
  product,
  wished,
  currentUser,
}: WishlistButtonProps) => {
  const { isWished, handleToggle } = useWishlist(
    actionId,
    product,
    wished,
    currentUser
  );

  const wishlistLabel = useMemo(() => {
    return isWished ? 'Added to Wishlist' : 'Add to Wishlist';
  }, [isWished]);

  return (
    <IconButton onClick={handleToggle}>
      <HeartIcon isWished={isWished} />
      {wishlistLabel}
    </IconButton>
  );
};

export default WishlistButton;
