import { useMemo } from 'react';
import { IUseFavorite } from '../types';

export const useFavorite = ({ likes, currentUser, actionId }: IUseFavorite) => {
  const hasFavorited = useMemo(() => {
    const list = likes.includes(actionId);
    return !!list;
  }, [actionId, likes]);

  return {
    hasFavorited,
  };
};
