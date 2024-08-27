import styled from 'styled-components';
import { useCallback, useMemo } from 'react';

import CardInfo from './CardInfo';
import CardImage from './CardImage';

import { useAuth } from '../../hooks/useAuth';
import { useCartStore } from '../../hooks/useCartStore';

import { ProductCardProps } from '../../types';

const ProductCard = ({
  product,
  onOpen,
  onSelect,
  onUpdate,
}: ProductCardProps) => {
  const currentUser = useAuth((state) => state.user);
  const cart = useCartStore((state) => state.cart);
  const wished = useCartStore((state) => state.wished);

  const handleOpen = useCallback(() => {
    onOpen();
    onSelect(product);
  }, [product, onOpen, onSelect]);

  const url = useMemo(() => {
    return `/products/${encodeURIComponent(product.id)}`;
  }, [product.id]);

  const reviewLabel = useMemo(() => {
    if (product.ratingsQuantity > 1) {
      return 'reviews';
    }

    return 'review';
  }, [product.ratingsQuantity]);

  const initialPrice = useMemo(() => {
    return product.price + product.discount;
  }, [product]);

  const priceLabel = useMemo(() => {
    return product.price;
  }, [product]);

  const inCart = useMemo(() => {
    const cartItem = cart.find((item) => item.id === product.id);
    return !!cartItem;
  }, [cart, product]);

  return (
    <Container>
      <CardImage src={product.images?.[0]} name={product.name} />
      <CardInfo
        url={url}
        currentUser={currentUser}
        product={product}
        initialPrice={initialPrice}
        priceLabel={priceLabel}
        reviewLabel={reviewLabel}
        inCart={inCart}
        wished={wished}
        onOpen={handleOpen}
        onUpdate={onUpdate}
      />
    </Container>
  );
};

const Container = styled.article`
  width: 35rem;
  background-color: ${({ theme }) => theme.bgProdCard};
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.boxCard};
  -webkit-box-shadow: ${({ theme }) => theme.boxCard};
  -moz-box-shadow: ${({ theme }) => theme.boxCard};
  overflow: hidden;

  @media only screen and (max-width: 64em) {
    width: 45rem;
  }

  @media only screen and (max-width: 59.375em) {
    width: 38rem;
  }

  @media only screen and (max-width: 51.25em) {
    width: 36rem;
  }

  @media only screen and (max-width: 50em) {
    width: 33rem;
  }

  @media only screen and (max-width: 37.5em) {
    width: 28rem;
  }

  @media only screen and (max-width: 33.75em) {
    width: 27rem;
  }

  @media only screen and (max-width: 32.9375em) {
    width: 26rem;
  }

  @media only screen and (max-width: 31.25em) {
    width: 100%;
  }

  @media only screen and (min-width: 112.5em) {
    width: 36.667rem;
  }
`;

export default ProductCard;
