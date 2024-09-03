import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import { HeartIconProps } from '../../types';

const HeartIcon = ({ isWished, currentUser }: HeartIconProps) => {
  return !!isWished && !!currentUser ? (
    <FavoriteOutlinedIcon />
  ) : (
    <FavoriteBorderOutlinedIcon />
  );
};

export default HeartIcon;
