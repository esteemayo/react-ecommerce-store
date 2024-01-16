import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

import { IconButton } from './IconButton';
import { FavoriteButtonProps } from '../../types';
import { useFavorite } from '../../hooks/useFavorite';

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
