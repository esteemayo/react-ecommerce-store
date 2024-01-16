import styled from 'styled-components';

import FavoriteButton from '../buttons/FavoriteButton';
import WishlistButton from '../buttons/WishlistButton';

import { CardButtonsProps } from '../../types';

const CardButtons = ({
  currentUser,
  product,
  productId,
  wished,
}: CardButtonsProps) => {
  return (
    <Container>
      <WishlistButton product={product} wished={wished} actionId={productId} />
      <FavoriteButton
        actionId={productId}
        currentUser={currentUser}
        likes={product.likes}
      />
    </Container>
  );
};

const Container = styled.div`
  padding-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 37.5em) {
    padding-top: 1.7rem;
  }
`;

export default CardButtons;
