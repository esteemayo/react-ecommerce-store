import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconButton } from './IconButton';
import { FavoriteButtonProps } from '../../types';

const FavoriteButton = ({
  actionId,
  currentUser,
  likes,
}: FavoriteButtonProps) => {
  return (
    <IconButton>
      <FontAwesomeIcon icon={faStarHalfAlt} />
      Add to favorites
    </IconButton>
  );
};

export default FavoriteButton;
