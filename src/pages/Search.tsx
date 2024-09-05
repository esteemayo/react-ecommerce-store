import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';

import ProductBox from '../components/products/ProductBox';
import ProductList from '../components/products/ProductList';

import Pagination from '../components/Pagination';
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

  const page = query.get('page');
  const searchQuery = query.get('q');

  const pageNumber = Number(page) || 1;

  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(6);
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const [data, setData] = useState(products);

  const searchUrl = useCallback(
    (page: number) => {
      return `/search?q=${searchQuery}&page=${page}`;
    },
    [searchQuery]
  );

  useEffect(() => {
    searchQuery &&
      (async () => {
        searchProductPending();
        try {
          const { data } = await searchProducts(searchQuery!, currentPage);
          setData(data.products);
          setTotalPages(data.numberOfPages);
          setTotal(data.total);
          setCurrentPage(data.page);
          searchProductFulfilled(data.products);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: unknown | any) {
          console.log(err);
          searchProductFailure(err.response.data.message);
        }
      })();
  }, [
    currentPage,
    searchProductFailure,
    searchProductFulfilled,
    searchProductPending,
    searchQuery,
  ]);

  useEffect(() => {
    setData(products);
    pageNumber && setCurrentPage(pageNumber);
  }, [pageNumber, products]);

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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onAction={setCurrentPage}
        paginationUrl={searchUrl}
      />
    </ProductBox>
  );
};

const Container = styled.section`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg};
`;

export default Search;
