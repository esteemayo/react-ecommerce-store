import styled from 'styled-components';

import ProductBox from '../components/products/ProductBox';
import Loader from '../components/Loader';
import ProductList from '../components/products/ProductList';

import { useSearchStore } from '../hooks/useSearchStore';

const Search = () => {
  const { isLoading, products } = useSearchStore();

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
