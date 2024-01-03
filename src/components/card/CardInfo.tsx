import styled from 'styled-components';

import CardPrice from './CardPrice';
import CardHeading from './CardHeading';
import CardButton from './CardButton';
import CardButtons from './CardButtons';
import CardReview from './CardReview';

import { CardInfoProps } from '@/types';

const CardInfo = ({
  url,
  product,
  initialPrice,
  priceLabel,
  reviewLabel,
  inCart,
  wished,
  onOpen,
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
      <CardButton inCart={inCart} onClick={onOpen} />
      <CardButtons product={product} wished={wished} productId={product.id} />
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
