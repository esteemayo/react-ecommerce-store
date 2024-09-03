import { useMemo } from 'react';

import { useAuth } from './useAuth';
import { useCartStore } from './useCartStore';

export const useCartControls = (productId: string) => {
  const cart = useCartStore((state) => state.cart);
  const currentUser = useAuth((state) => state.user);

  const inCart = useMemo(() => {
    if (!!currentUser) {
      const cartItem = cart.find((item) => item.id === productId);
      return !!cartItem;
    }
  }, [cart, currentUser, productId]);

  const actionLabel = useMemo(() => {
    return `${inCart ? 'Added' : 'Add'} to cart`;
  }, [inCart]);

  return {
    inCart,
    actionLabel,
  };
};
