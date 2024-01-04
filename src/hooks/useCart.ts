import { useCallback, useState } from 'react';

import { ProductValues } from '../types';
import { useCartStore } from './useCartStore';

export const useCart = (product: ProductValues) => {
  const addProduct = useCartStore((state) => state.addProduct);
  const removeWishlist = useCartStore((state) => state.removeWishlist);

  const [color, setColor] = useState<string | string[]>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [size, setSize] = useState<string | string[]>('');
  const [isSelected, setIsSelected] = useState<string | null>(null);
  const [alert, setAlert] = useState(false);

  const handleReset = useCallback(() => {
    setSize('');
    setColor('');
    setQuantity(1);
    setIsSelected(null);
    setSelectedSize(null);
  }, []);

  const handleClick = useCallback(() => {
    addProduct({ ...product, size, color, quantity });
    removeWishlist(product.id);
    setAlert(true);
    handleReset();
  }, [addProduct, color, product, removeWishlist, quantity, size, handleReset]);

  return {
    alert,
    setAlert,
    handleClick,
    selectedSize,
    isSelected,
    quantity,
    setQuantity,
    setSize,
    setSelectedSize,
    setIsSelected,
    setColor,
    handleReset,
  };
};
