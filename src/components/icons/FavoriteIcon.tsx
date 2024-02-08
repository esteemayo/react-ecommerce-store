import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

interface FavoriteIconProps {
  isFavorite: boolean;
}

const FavoriteIcon = ({ isFavorite }: FavoriteIconProps) => {
  return isFavorite ? <StarIcon /> : <StarOutlineIcon />;
};

export default FavoriteIcon;
