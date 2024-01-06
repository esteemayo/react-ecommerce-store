import { useState } from 'react';

import ProductBox from '../components/products/ProductBox';
import ProductList from '../components/products/ProductList';

import { storeProducts } from '../data';

const Search = () => {
  const [products, setProducts] = useState(storeProducts);

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
