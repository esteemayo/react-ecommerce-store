import styled from 'styled-components';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const WishProduct = () => {
  return (
    <Button>
      Wishlist
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
  font-size: 1.8rem;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.colCrumbs};
  border-radius: 0.5rem;
  line-height: 1.3em;
  outline-color: #eee;
  margin-bottom: 3rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.text};
  }

  svg {
    font-size: inherit;
    color: currentColor;
  }
`;

export default WishProduct;
