import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCallback, useMemo } from 'react';
import { IUseFavorite } from '../types';
import { likeProduct } from '../services/productService';

export const useFavorite = ({ likes, currentUser, actionId }: IUseFavorite) => {
  const navigate = useNavigate();

  const hasFavorited = useMemo(() => {
    const userId = currentUser.details._id;
    const list = likes.includes(userId);

    return !!list;
  }, [currentUser, likes]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return navigate('/login');
      }

      try {
        await likeProduct(actionId);
      } catch (err: unknown) {
        console.log(err);
        toast.error('Something went wrong!!!');
      }
    },
    [actionId, currentUser, navigate]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};
