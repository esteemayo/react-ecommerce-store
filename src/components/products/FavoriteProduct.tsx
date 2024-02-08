import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

import { FavoriteProductProps } from '../../types';
import { useFavorite } from '../../hooks/useFavorite';

const FavoriteProduct = ({
  actionId,
  currentUser,
  likes,
  onFavorite,
}: FavoriteProductProps) => {
  const { hasFavorited, toggleFavorite } = useFavorite(
    actionId,
    currentUser,
    likes
  );

  return (
    <Button>
      Favorite
      <FontAwesomeIcon icon={faStarHalfAlt} />
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

export default FavoriteProduct;
