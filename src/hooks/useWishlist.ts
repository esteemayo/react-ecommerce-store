import { useCallback, useMemo } from 'react';

import { useCartStore } from './useCartStore';
import { WishlistProps, WishlistValues } from '@/types';

const useWishlist: WishlistProps = (
  actionId: number,
  product: WishlistValues,
  wished: number[]
) => {
  const addWishlist = useCartStore((state) => state.addWishlist);
  const removeWishlist = useCartStore((state) => state.removeWishlist);

  const isWished = useMemo(() => {
    const list = wished?.includes(actionId);
    return !!list;
  }, [actionId, wished]);

  const handleToggle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (wished.includes(actionId)) {
        removeWishlist(actionId);
        return;
      }

      addWishlist({ ...product });
    },
    [actionId, addWishlist, product, removeWishlist, wished]
  );

  return {
    isWished,
    handleToggle,
  };
};

export default useWishlist;
