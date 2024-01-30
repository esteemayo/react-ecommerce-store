import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Heading from '../components/filters/Heading';
import Select from '../components/filters/Select';
import SelectPrice from '../components/filters/SelectPrice';
import Option from '../components/filters/Option';
import ProductBox from '../components/products/ProductBox';

import ProductList from '../components/products/ProductList';
import Loader from '../components/Loader';
import EmptyProduct from '../components/products/EmptyProduct';

import { priceOptions } from '../data';
import { getUnique } from '../utils';
import { ProductValues } from '../types';

import { getProductCategory } from '../services/productService';

const ProductCategory = () => {
  const { pathname } = useLocation();
  const category = pathname.split('/').pop();

  const [sort, setSort] = useState('latest');
  const [products, setProducts] = useState<ProductValues[]>([]);
  const [filters, setFilters] = useState({});
  const [sortedProducts, setSortedProducts] = useState<ProductValues[]>([]);

  const { isLoading, data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await getProductCategory(category);
      return data.products;
    },
  });

  const handleSort = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  }, []);

  const handleFilter = useCallback(
    ({
      target: input,
    }: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const { name, value } = input;
      setFilters((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  useEffect(() => {
    setProducts(data);
  }, [data]);

  useEffect(() => {
    category &&
      setSortedProducts(
        products?.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [category, filters, products]);

  useEffect(() => {
    if (sort === 'latest') {
      setSortedProducts((prev) =>
        [...prev].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      );
    }

    if (sort === 'asc') {
      setSortedProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    }

    if (sort === 'desc') {
      setSortedProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  let colors = getUnique(products, 'color');
  colors = colors?.map((color, index) => {
    return <Option key={index} value={color} />;
  });

  let sizes = getUnique(products, 'size');
  sizes = sizes?.map((size, index) => {
    return <Option key={index} value={size} />;
  });

  if (isLoading) {
    return (
      <LoaderContainer>
        <Loader size='md' title='Loading...' />
      </LoaderContainer>
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
      <Container>
        <Heading title='Filter by' />
        <Wrapper>
          <Left>
            <Select
              name='color'
              label='Color'
              options={colors}
              onChange={handleFilter}
            />
            {sizes.length > 1 && (
              <Select
                name='size'
                label='Product size'
                options={sizes}
                onChange={handleFilter}
              />
            )}
          </Left>
          <Right>
            <SelectPrice
              name='price'
              label='Product price'
              value={sort}
              options={priceOptions}
              onChange={handleSort}
            />
          </Right>
        </Wrapper>
      </Container>
      {category ? (
        <ProductList products={sortedProducts} />
      ) : (
        <ProductList products={products} />
      )}
    </ProductBox>
  );
};

const LoaderContainer = styled.section`
  width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg};
`;

const Container = styled.section`
  padding: 7rem 0;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media only screen and (max-width: 37.5em) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 7rem;

  @media only screen and (max-width: 59.375em) {
    gap: 4rem;
  }

  @media only screen and (max-width: 37.5em) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  @media only screen and (max-width: 31.25em) {
    gap: 1.5rem;
  }

  @media only screen and (max-width: 26.25em) {
    gap: 3rem;
  }

  @media only screen and (max-width: 18.75em) {
    gap: 1rem;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;

  @media only screen and (max-width: 37.5em) {
    margin-top: 2rem;
  }
`;

export default ProductCategory;
