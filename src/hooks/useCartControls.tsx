import { useMemo } from 'react';

import { useCartStore } from './useCartStore';

export const useCartControls = (productId: string) => {
  const cart = useCartStore((state) => state.cart);

  const inCart = useMemo(() => {
    const cartItem = cart.find((item) => item.id === productId);
    return !!cartItem;
  }, [cart, productId]);

  const actionLabel = useMemo(() => {
    return `${inCart ? 'Added' : 'Add'} to cart`;
  }, [inCart]);

  return {
    inCart,
    actionLabel,
  };
};
