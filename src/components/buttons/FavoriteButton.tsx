import { useMemo } from 'react';

import { FavoriteButtonProps } from '../../types';
import { useFavorite } from '../../hooks/useFavorite';

import { IconButton } from './IconButton';
import FavoriteIcon from '../icons/FavoriteIcon';

const FavoriteButton = ({
  actionId,
  currentUser,
  likes,
}: FavoriteButtonProps) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    likes,
    currentUser,
    actionId,
  });

  const favLabel = useMemo(() => {
    return hasFavorited ? 'Added to favorites' : 'Add to favorites';
  }, [hasFavorited]);

  return (
    <IconButton onClick={toggleFavorite}>
      <FavoriteIcon isFavorite={hasFavorited} />
      {favLabel}
    </IconButton>
  );
};

export default FavoriteButton;
