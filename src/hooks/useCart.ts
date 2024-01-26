import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCartModal } from './useCartModal';
import { useAuth } from './useAuth';
import { useCartStore } from './useCartStore';

import { ProductValues } from '../types';

export const useCart = (product: ProductValues) => {
  const navigate = useNavigate();

  const onClose = useCartModal((state) => state.onClose);
  const currentUser = useAuth((state) => state.user);
  const addProduct = useCartStore((state) => state.addProduct);
  const isOpen = useCartModal((state) => state.isOpen);
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
    if (!currentUser) {
      isOpen && onClose();
      return navigate('/login');
    }

    if ((quantity && color) || size) {
      addProduct({ ...product, size, color, quantity });
      removeWishlist(product.id);
      setAlert(true);
      handleReset();
    }
  }, [
    addProduct,
    color,
    currentUser,
    isOpen,
    navigate,
    onClose,
    product,
    removeWishlist,
    quantity,
    size,
    handleReset,
  ]);

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
