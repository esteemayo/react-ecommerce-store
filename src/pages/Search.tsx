import { useEffect, useState } from 'react';
import styled from 'styled-components';

import ProductBox from '../components/products/ProductBox';
import ProductList from '../components/products/ProductList';

import Loader from '../components/Loader';
import EmptySearch from '../components/empty/EmptySearch';

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

  const [data, setData] = useState(products);

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

  useEffect(() => {
    setData(products);
  }, [products]);

  if (isLoading) {
    return (
      <Container>
        <Loader size='md' />
      </Container>
    );
  }

  if (products.length < 1) {
    return <EmptySearch />;
  }

  return (
    <ProductBox>
      <ProductList products={data} onUpdate={setData} />
    </ProductBox>
  );
};

const Container = styled.section`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg};
`;

export default Search;
