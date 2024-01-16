import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

interface FavoriteIconProps {
  isFavorite: boolean;
}

const FavoriteIcon = ({ isFavorite }: FavoriteIconProps) => {
  return isFavorite ? (
    <FontAwesomeIcon icon={faStar} />
  ) : (
    <FontAwesomeIcon icon={faStarHalfAlt} />
  );
};

export default FavoriteIcon;
