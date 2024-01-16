import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

import { FavoriteButtonProps } from '../../types';
import { useFavorite } from '../../hooks/useFavorite';

import { IconButton } from './IconButton';
import { useMemo } from 'react';

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
      {hasFavorited ? (
        <FontAwesomeIcon icon={faStar} />
      ) : (
        <FontAwesomeIcon icon={faStarHalfAlt} />
      )}
      {favLabel}
    </IconButton>
  );
};

export default FavoriteButton;
