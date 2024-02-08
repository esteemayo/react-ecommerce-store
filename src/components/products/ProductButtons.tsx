import styled from 'styled-components';

import WishProduct from './WishProduct';
import FavoriteProduct from './FavoriteProduct';

import { ProductButtonsProps } from '../../types';

interface IProps {
  alert: string;
}

const ProductButtons = ({
  actionId,
  alert,
  currentUser,
  product,
  likes,
  onFavorite,
}: ProductButtonsProps) => {
  return (
    <Container alert={alert.toString()}>
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

const Container = styled.div<IProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-top: ${({ alert }) => (alert === 'true' ? '1rem' : undefined)};
`;

export default ProductButtons;
