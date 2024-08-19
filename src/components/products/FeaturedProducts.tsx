import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import ProductCard from '../card/ProductCard';
import CartModal from '../modals/CartModal';

import Header from '../Header';
import Spinner from '../Spinner';

import { useAuth } from '../../hooks/useAuth';
import { useCartModal } from '../../hooks/useCartModal';

import { ProductValues, WishlistValues } from '../../types';
import { getFeaturedProducts } from '../../services/productService';

import { StyledWrapper } from '../StyledWrapper';

const FeaturedProducts = () => {
  const isOpen = useCartModal((state) => state.isOpen);
  const currentUser = useAuth((state) => state.user);
  const onClose = useCartModal((state) => state.onClose);
  const onOpen = useCartModal((state) => state.onOpen);

  const [featuredProducts, setFeaturedProduct] = useState<ProductValues[]>([]);
  const [isSelectedProduct, setIsSelectedProduct] = useState<WishlistValues>();

  const { isLoading, error, data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await getFeaturedProducts();
      return data;
    },
  });

  useEffect(() => {
    setFeaturedProduct(data?.products);
  }, [data]);

  return (
    <Container>
      <StyledWrapper>
        <Header title='Featured products' />
        <ProductsContainer>
          {isLoading ? (
            <Box>
              <Spinner size='md' />
            </Box>
          ) : error ? (
            'Something went wrong!'
          ) : (
            <>
              {featuredProducts?.map((product: ProductValues) => {
                return (
                  <ProductCard
                    key={product.id}
                    currentUser={currentUser}
                    product={product}
                    onOpen={onOpen}
                    onSelect={setIsSelectedProduct}
                    onUpdate={setFeaturedProduct}
                  />
                );
              })}
            </>
          )}
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
    justify-content: space-between;
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
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default FeaturedProducts;
