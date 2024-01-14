import { useEffect } from 'react';
import styled from 'styled-components';

import ProductBox from '../components/products/ProductBox';
import Loader from '../components/Loader';
import ProductList from '../components/products/ProductList';

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

export default Search;
