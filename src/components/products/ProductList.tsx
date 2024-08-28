import { useState } from 'react';
import styled from 'styled-components';

import CartModal from '../modals/CartModal';
import ProductCard from '../card/ProductCard';

import { useAuth } from '../../hooks/useAuth';
import { useCartModal } from '../../hooks/useCartModal';

import { ProductListProps, WishlistValues } from '../../types';

const ProductList = ({ products, onUpdate }: ProductListProps) => {
  const currentUser = useAuth((state) => state.user);

  const { isOpen, onOpen, onClose } = useCartModal();
  const [isSelectedProduct, setIsSelectedProduct] = useState<WishlistValues>();

  return (
    <Container>
      <Wrapper>
        {products?.map((product) => {
          return (
            <ProductCard
              key={product.id}
              currentUser={currentUser}
              product={product}
              onOpen={onOpen}
              onSelect={setIsSelectedProduct}
              onUpdate={onUpdate}
            />
          );
        })}
      </Wrapper>
      <CartModal
        product={isSelectedProduct}
        isOpen={isOpen}
        onClose={onClose}
        onSelect={setIsSelectedProduct}
      />
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  padding: 10rem 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 7rem;

  @media only screen and (max-width: 64em) {
    justify-content: space-between;
  }

  @media only screen and (max-width: 59.375em) {
    gap: 4rem;
  }

  @media only screen and (max-width: 51.25em) {
    gap: 7rem;
  }

  @media only screen and (max-width: 50em) {
    gap: 4rem;
  }

  @media only screen and (max-width: 34.375em) {
    column-gap: 2rem;
  }

  @media only screen and (max-width: 31.9375em) {
    column-gap: 1rem;
  }

  @media only screen and (max-width: 30em) {
    gap: 7rem;
  }

  @media only screen and (max-width: 26.25em) {
    gap: 5rem;
  }

  @media only screen and (max-width: 18.75em) {
    gap: 4rem;
  }

  @media only screen and (min-width: 112.5em) {
    gap: 5rem;
  }
`;

export default ProductList;
