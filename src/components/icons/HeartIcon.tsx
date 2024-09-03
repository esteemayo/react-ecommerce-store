import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import { CurrentUserType } from '../../types';

interface HeartIconProps {
  isWished: boolean;
  currentUser: CurrentUserType;
}

const HeartIcon = ({ isWished, currentUser }: HeartIconProps) => {
  return !!isWished && !!currentUser ? (
    <FavoriteOutlinedIcon />
  ) : (
    <FavoriteBorderOutlinedIcon />
  );
};

export default HeartIcon;
