import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

import { FavoriteButtonProps } from '../../types';
import { useFavorite } from '../../hooks/useFavorite';

import { IconButton } from './IconButton';

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

  return (
    <IconButton onClick={toggleFavorite}>
      {hasFavorited ? (
        <FontAwesomeIcon icon={faStar} />
      ) : (
        <FontAwesomeIcon icon={faStarHalfAlt} />
      )}
      Add to favorites
    </IconButton>
  );
};

export default FavoriteButton;
