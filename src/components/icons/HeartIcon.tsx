import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

interface HeartIconProps {
  isWished: boolean;
}

const HeartIcon = ({ isWished }: HeartIconProps) => {
  return isWished ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />;
};

export default HeartIcon;
