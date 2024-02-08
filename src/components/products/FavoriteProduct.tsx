import { useMemo } from 'react';
import styled from 'styled-components';

import { FavoriteProductProps } from '../../types';
import { useFavorite } from '../../hooks/useFavorite';

import FavoriteIcon from '../icons/FavoriteIcon';

const FavoriteProduct = ({
  actionId,
  currentUser,
  likes,
  onFavorite,
}: FavoriteProductProps) => {
  const { hasFavorited, toggleFavorite } = useFavorite(
    actionId,
    currentUser,
    likes,
    undefined,
    onFavorite
  );

  const btnLabel = useMemo(() => {
    return hasFavorited ? 'Favorited' : 'Favorite';
  }, [hasFavorited]);

  return (
    <Button onClick={toggleFavorite}>
      {btnLabel}
      <FavoriteIcon isFavorite={hasFavorited} />
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
    fill: currentColor;
  }
`;

export default FavoriteProduct;
