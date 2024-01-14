import ProductBox from '../components/products/ProductBox';
import ProductList from '../components/products/ProductList';

import { useSearch } from '../hooks/useSearch';

const Search = () => {
  const { products } = useSearch();

  return (
    <ProductBox>
      <ProductList
        products={products}
        title='No result matches your search criteria'
      />
    </ProductBox>
  );
};

export default Search;
