import styled from 'styled-components';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import ProductCard from '../card/ProductCard';
import CartModal from '../modals/CartModal';

import Header from '../Header';
import Spinner from '../Spinner';

import { useAuth } from '../../hooks/useAuth';
import { useCartModal } from '../../hooks/useCartModal';
import { getFeaturedProducts } from '../../services/productService';

import { StyledWrapper } from '../StyledWrapper';
import { ProductType, WishlistValues } from '../../types';

const FeaturedProducts = () => {
  const isOpen = useCartModal((state) => state.isOpen);
  const onClose = useCartModal((state) => state.onClose);
  const onOpen = useCartModal((state) => state.onOpen);
  const currentUser = useAuth((state) => state.user);

  const [isSelectedProduct, setIsSelectedProduct] = useState<WishlistValues>();

  const { isLoading, data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await getFeaturedProducts();
      return data;
    },
  });

  return (
    <Container>
      <StyledWrapper>
        <Header title='Featured products' />
        <ProductsContainer>
          {isLoading ? (
            <Box>
              <Spinner size='md' />
            </Box>
          ) : (
            <>
              {data?.products?.map((product: ProductType) => {
                return (
                  <ProductCard
                    key={product.id}
                    currentUser={currentUser}
                    product={product}
                    onOpen={onOpen}
                    onSelect={setIsSelectedProduct}
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

const Box = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default FeaturedProducts;
