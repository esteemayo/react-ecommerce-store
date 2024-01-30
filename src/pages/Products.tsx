import styled from 'styled-components';
import { useEffect, useState } from 'react';

import EmptyProduct from '../components/products/EmptyProduct';
import ProductBox from '../components/products/ProductBox';
import ProductFilter from '../components/products/ProductFilter';
import ProductList from '../components/products/ProductList';

import Loader from '../components/Loader';
import Pagination from '../components/Pagination';

import { ProductValues } from '../types';
import { getProducts } from '../services/productService';
import { useQuery } from '../utils';

const Products = () => {
  const query = useQuery();
  const currentPage = query.get('page');

  const pageNumber = Number(currentPage);

  const [category, setCategory] = useState('all');
  const [size, setSize] = useState('all');
  const [color, setColor] = useState('all');
  const [minPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState<ProductValues[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortedProducts, setSortedProducts] = useState<ProductValues[]>([]);

  const [counts, setCounts] = useState<number>();
  const [page, setPage] = useState<number>();
  const [numberOfPages, setNumberOfPages] = useState<number>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const { data } = await getProducts(pageNumber);
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
  }, [pageNumber]);

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
        <Loader size='md' title='Loading...' />
      </Container>
    );
  }

  if (products?.length < 1) {
    return (
      <Container>
        <EmptyProduct src='/img/no-result.png' title='No results found!' />
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
  padding: 10rem 0;
  background-color: ${({ theme }) => theme.bg};
`;

export default Products;
