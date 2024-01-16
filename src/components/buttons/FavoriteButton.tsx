import { useMemo } from 'react';

import { IconButton } from './IconButton';
import FavoriteIcon from '../icons/FavoriteIcon';

import { FavoriteButtonProps } from '../../types';
import { useFavorite } from '../../hooks/useFavorite';

const FavoriteButton = ({
  actionId,
  currentUser,
  likes,
}: FavoriteButtonProps) => {
  const { hasFavorited, toggleFavorite } = useFavorite(
    actionId,
    currentUser,
    likes
  );

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
