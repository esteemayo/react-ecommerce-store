import styled from 'styled-components';

import CardButton from './CardButton';
import CardPrice from './CardPrice';
import CardHeading from './CardHeading';
import CardReview from './CardReview';
import CardButtons from './CardButtons';

import { CardInfoProps } from '../../types';

const CardInfo = ({
  url,
  currentUser,
  product,
  initialPrice,
  priceLabel,
  reviewLabel,
  wished,
  onOpen,
  onUpdate,
}: CardInfoProps) => {
  return (
    <Container>
      <CardHeading url={url} name={product.name} />
      <CardReview
        reviewLabel={reviewLabel}
        ratingsAverage={product.ratingsAverage}
        ratingsQuantity={product.ratingsQuantity}
      />
      <CardPrice
        inStock={product.inStock}
        initialPrice={initialPrice}
        priceLabel={priceLabel}
      />
      <CardButton actionId={product.id} onAction={onOpen} />
      <CardButtons
        currentUser={currentUser}
        product={product}
        wished={wished}
        productId={product.id}
        onUpdate={onUpdate}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  background-color: inherit;
  border-radius: 0.5rem;

  @media only screen and (max-width: 35em) {
    padding: 1rem;
  }
`;

export default CardInfo;
