import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { CurrentUserType, IFavorite } from '../types';
import { likeProduct } from '../services/productService';

export const useFavorite: IFavorite = (
  actionId: string,
  currentUser: CurrentUserType,
  likes: string[],
  onUpdate
) => {
  const navigate = useNavigate();

  const hasFavorited = useMemo(() => {
    const product = likes || [];
    const userId = currentUser?.details._id;

    const list = product.includes(userId);
    return !!list;
  }, [currentUser, likes]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return navigate('/login');
      }

      try {
        const { data } = await likeProduct(actionId);
        onUpdate?.((prev) => {
          return [...prev].map((item) => (item.id === actionId ? data : item));
        });
      } catch (err: unknown) {
        console.log(err);
        toast.error('Something went wrong!!!');
      }
    },
    [actionId, currentUser, navigate, onUpdate]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};
