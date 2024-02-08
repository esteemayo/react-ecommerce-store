import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import styled from 'styled-components';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const FavoriteButton = () => {
  return (
    <Button>
      Favorite
      <FavoriteBorderOutlinedIcon />
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  width: 100%;
  padding: 2rem 1rem;
`;

export default FavoriteButton;
