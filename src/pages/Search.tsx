import styled from 'styled-components';

import ProductBox from '../components/products/ProductBox';
import Loader from '../components/Loader';
import ProductList from '../components/products/ProductList';

import { useSearchStore } from '../hooks/useSearchStore';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { searchProducts } from '../services/productService';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Search = () => {
  const {
    fetchProductFailure,
    fetchProductFulfilled,
    fetchProductPending,
    isLoading,
    products,
  } = useSearchStore();

  const query = useQuery();
  const searchQuery = query.get('q');

  useEffect(() => {
    searchQuery &&
      (async () => {
        fetchProductPending();
        try {
          const { data } = await searchProducts(searchQuery!);
          fetchProductFulfilled(data);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: unknown | any) {
          console.log(err);
          fetchProductFailure(err.response.data.message);
        }
      })();
  }, [
    fetchProductFailure,
    fetchProductFulfilled,
    fetchProductPending,
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
