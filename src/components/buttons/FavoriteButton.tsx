import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconButton } from './IconButton';

const FavoriteButton = () => {
  return (
    <IconButton>
      <FontAwesomeIcon icon={faStarHalfAlt} />
      Add to favorites
    </IconButton>
  );
};

export default FavoriteButton;
