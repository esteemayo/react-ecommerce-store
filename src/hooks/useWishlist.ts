import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCartStore } from './useCartStore';
import { CurrentUserType, WishlistProps, WishlistValues } from '../types';

export const useWishlist: WishlistProps = (
  actionId: string,
  product: WishlistValues,
  wished: string[],
  currentUser: CurrentUserType
) => {
  const navigate = useNavigate();

  const addWishlist = useCartStore((state) => state.addWishlist);
  const removeWishlist = useCartStore((state) => state.removeWishlist);

  const isWished = useMemo(() => {
    const list = wished?.includes(actionId);
    return !!list;
  }, [actionId, wished]);

  const handleToggle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return navigate('/login');
      }

      if (wished.includes(actionId)) {
        removeWishlist(actionId);
        return;
      }

      addWishlist({ ...product });
    },
    [
      actionId,
      addWishlist,
      currentUser,
      navigate,
      product,
      removeWishlist,
      wished,
    ]
  );

  return {
    isWished,
    handleToggle,
  };
};
