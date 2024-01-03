'use client';

import { useEffect } from 'react';

import { useCartStore } from '@/hooks/useCartStore';

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const cart = useCartStore((state) => state.cart);
  const calcTotals = useCartStore((state) => state.calcTotals);

  useEffect(() => {
    calcTotals();
  }, [cart, calcTotals]);

  return <>{children}</>;
};

export default CartProvider;
