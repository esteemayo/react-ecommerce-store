import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import styled from 'styled-components';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const FavoriteButton = () => {
  return (
    <Button>
      Favorite
      <FavoriteOutlinedIcon />
    </Button>
  );
};

const Button = styled.button`
  display: inline-block;
`;

export default FavoriteButton;
