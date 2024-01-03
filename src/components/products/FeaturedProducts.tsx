'use client';

import styled from 'styled-components';
import { useEffect, useState } from 'react';

import Header from '../Header';
import ProductCard from '../card/ProductCard';
import CartModal from '../modals/CartModal';

import { StoreProduct, WishlistValues } from '@/types';
import { useCartModal } from '@/hooks/useCartModal';
import { getFeaturedProducts } from '@/services/productService';

import { StyledWrapper } from '../StyledWrapper';

const FeaturedProducts = () => {
  const isOpen = useCartModal((state) => state.isOpen);
  const onClose = useCartModal((state) => state.onClose);
  const onOpen = useCartModal((state) => state.onOpen);

  const [isSelectedProduct, setIsSelectedProduct] =
    useState<WishlistValues>(null);
  const [featuredProducts, setFeaturedProducts] = useState<StoreProduct>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getFeaturedProducts();
        console.log(data.products);
        setFeaturedProducts(data.products);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <Container>
      <StyledWrapper>
        <Header title='Featured products' />
        <ProductsContainer>
          {featuredProducts.map((product) => {
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
      </StyledWrapper>
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
  width: 100vw;
  padding: 15rem 0;
  background-color: ${({ theme }) => theme.soft};

  @media only screen and (max-width: 64em) {
    padding: 13rem 0;
  }
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

export default FeaturedProducts;
