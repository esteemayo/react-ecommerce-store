import styled from 'styled-components';

import WishProduct from './WishProduct';
import FavoriteProduct from './FavoriteProduct';

import { ProductButtonsProps } from '../../types';

const ProductButtons = ({
  actionId,
  alert,
  currentUser,
  product,
  likes,
  onFavorite,
}: ProductButtonsProps) => {
  return (
    <Container>
      <WishProduct
        actionId={actionId}
        product={product}
        currentUser={currentUser}
      />
      <FavoriteProduct
        actionId={actionId}
        currentUser={currentUser}
        likes={likes}
        onFavorite={onFavorite}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 2rem;
`;

export default ProductButtons;
