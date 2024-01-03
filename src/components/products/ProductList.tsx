'use client';

import styled from 'styled-components';
import { useState } from 'react';

import ProductCard from '../card/ProductCard';
import CartModal from '../modals/CartModal';
import EmptyProduct from './EmptyProduct';

import { useCartModal } from '@/hooks/useCartModal';
import { ProductListProps, WishlistValues } from '@/types';

const ProductList = ({
  products,
  title = 'No results found!',
}: ProductListProps) => {
  const { isOpen, onOpen, onClose } = useCartModal();
  const [isSelectedProduct, setIsSelectedProduct] =
    useState<WishlistValues>(null);

  if (products.length < 1) {
    return (
      <Container>
        <EmptyProduct src='/img/no-result.png' title={title} />
      </Container>
    );
  }

  return (
    <Container>
      <ProductsContainer>
        {products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={onOpen}
              onSelect={setIsSelectedProduct}
            />
          );
        })}
      </ProductsContainer>
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

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 7rem;

  @media only screen and (max-width: 59.375em) {
    gap: 4rem;
  }

  @media only screen and (max-width: 37.5em) {
    gap: 2rem;
  }

  @media only screen and (max-width: 31.25em) {
    gap: 1.5rem;
  }

  @media only screen and (max-width: 26.25em) {
    gap: 3rem;
  }

  @media only screen and (max-width: 18.75em) {
    gap: 1rem;
  }
`;

export default ProductList;
