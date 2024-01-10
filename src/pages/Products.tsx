import styled from 'styled-components';
import { useEffect, useState } from 'react';

import Loader from '../components/Loader';
import ProductList from '../components/products/ProductList';
import Pagination from '../components/Pagination';
import ProductFilter from '../components/products/ProductFilter';
import ProductBox from '../components/products/ProductBox';

import { ProductValues } from '../types';
import { getProducts } from '../services/productService';

const Products = () => {
  const [category, setCategory] = useState('all');
  const [size, setSize] = useState('all');
  const [color, setColor] = useState('all');
  const [minPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState<ProductValues[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortedProducts, setSortedProducts] = useState<ProductValues[]>([]);

  const [counts, setCounts] = useState(20);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const { data } = await getProducts(page);
        console.log(data);
        const maxPrice = Math.max(
          ...data.products.map((item: ProductValues) => item.price)
        );

        setProducts(data.products);
        setSortedProducts(data.products);
        setMaxPrice(maxPrice);
        setPrice(maxPrice);

        setCounts(data.counts);
        setPage(data.page);
        setNumberOfPages(data.numberOfPages);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page]);

  useEffect(() => {
    let tempProducts = [...products];

    if (category !== 'all') {
      tempProducts = tempProducts.filter((item) => item.category === category);
    }

    if (color !== 'all') {
      tempProducts = tempProducts.filter((item) => item.color.includes(color));
    }

    if (size !== 'all') {
      tempProducts = tempProducts.filter((item) => item.size.includes(size));
    }

    tempProducts = tempProducts.filter((item) => item.price <= price);

    setSortedProducts(tempProducts);
  }, [category, color, price, products, size]);

  if (isLoading) {
    return (
      <Container>
        <Loader size='md' />
      </Container>
    );
  }

  return (
    <ProductBox>
      <ProductFilter
        products={products}
        price={price}
        category={category}
        size={size}
        color={color}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setCategory={setCategory}
        setSize={setSize}
        setColor={setColor}
        setPrice={setPrice}
      />
      <ProductList products={sortedProducts} />
      {products.length > 0 && (
        <Pagination counts={counts} page={page} numberOfPages={numberOfPages} />
      )}
    </ProductBox>
  );
};

const Container = styled.section`
  width: 100vw;
  min-height: 100vh;
`;

export default Products;
