import { useEffect } from 'react';
import styled from 'styled-components';

import ProductBox from '../components/products/ProductBox';
import Loader from '../components/Loader';
import ProductList from '../components/products/ProductList';
import { CommonImage } from '../components/CommonImage';

import { useSearchStore } from '../hooks/useSearchStore';
import { searchProducts } from '../services/productService';

import { useQuery } from '../utils';

const Search = () => {
  const {
    searchProductFailure,
    searchProductFulfilled,
    searchProductPending,
    isLoading,
    products,
  } = useSearchStore();

  const query = useQuery();
  const searchQuery = query.get('q');

  useEffect(() => {
    searchQuery &&
      (async () => {
        searchProductPending();
        try {
          const { data } = await searchProducts(searchQuery!);
          searchProductFulfilled(data);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: unknown | any) {
          console.log(err);
          searchProductFailure(err.response.data.message);
        }
      })();
  }, [
    searchProductFailure,
    searchProductFulfilled,
    searchProductPending,
    searchQuery,
  ]);

  if (isLoading) {
    return (
      <Container>
        <Loader size='md' />
      </Container>
    );
  }

  if (products.length < 1) {
    return (
      <Container>
        <Wrapper>
          <StyledImage
            src='/img/no-result.png'
            width={500}
            height={250}
            alt=''
          />
          <Message>No result matches your search criteria</Message>
        </Wrapper>
      </Container>
    );
  }

  return (
    <ProductBox>
      <ProductList
        products={products}
        title='No result matches your search criteria'
      />
    </ProductBox>
  );
};

const Container = styled.section`
  width: 100vw;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 3rem;
`;

const StyledImage = styled(CommonImage)`
  width: 50rem;
  height: 25rem;
  background-color: transparent;

  @media only screen and (max-width: 25em) {
    width: 40rem;
  }

  @media only screen and (max-width: 18.75em) {
    width: 34.5rem;
  }
`;

const Message = styled.span`
  font-size: 2rem;
  color: ${({ theme }) => theme.textNotFound};
`;

export default Search;
