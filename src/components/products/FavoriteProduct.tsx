import { useMemo } from 'react';

import { Button } from './Button';
import FavoriteIcon from '../icons/FavoriteIcon';

import { FavoriteProductProps } from '../../types';
import { useFavorite } from '../../hooks/useFavorite';

const FavoriteProduct = ({
  actionId,
  currentUser,
  likes,
  onFavorite,
}: FavoriteProductProps) => {
  const { hasFavorited, toggleFavorite } = useFavorite(
    actionId,
    currentUser,
    likes,
    undefined,
    onFavorite
  );

  const btnLabel = useMemo(() => {
    return hasFavorited ? 'Favorited' : 'Favorite';
  }, [hasFavorited]);

  return (
    <Button type='button' onClick={toggleFavorite}>
      {btnLabel}
      <FavoriteIcon isFavorite={hasFavorited} />
    </Button>
  );
};

export default FavoriteProduct;
