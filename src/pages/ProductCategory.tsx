import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(false);

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
    (async () => {
      setIsLoading(true);

      try {
        const { data } = await getProductCategory(category);
        setProducts(data.products);
      } catch (err: unknown) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [category]);

  useEffect(() => {
    category &&
      setSortedProducts(
        products?.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key as keyof typeof item].includes(value)
          )
        )
      );
  }, [category, filters, products]);

  useEffect(() => {
    if (sort === 'latest') {
      setSortedProducts((prev) => {
        return [...prev].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      });
    }

    if (sort === 'asc') {
      setSortedProducts((prev) => {
        return [...prev].sort((a, b) => a.price - b.price);
      });
    }

    if (sort === 'desc') {
      setSortedProducts((prev) => {
        return [...prev].sort((a, b) => b.price - a.price);
      });
    }
  }, [sort]);

  const allColors: string[] = getUnique(products, 'color');
  const colors = allColors?.map((color, index) => {
    return <Option key={index} value={color} />;
  });

  const allSizes = getUnique(products, 'size');
  const sizes = allSizes?.map((size, index) => {
    return <Option key={index} value={size} />;
  });

  if (isLoading) {
    return (
      <Box>
        <Loader size='md' title='Loading...' />
      </Box>
    );
  }

  if (products?.length < 1) {
    return (
      <Box>
        <EmptyProduct
          src='/img/no-result.png'
          title={`Category "${category}" is currently empty.`}
        />
      </Box>
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
        <ProductList products={sortedProducts} onUpdate={setProducts} />
      ) : (
        <ProductList products={products} onUpdate={setProducts} />
      )}
    </ProductBox>
  );
};

const Box = styled.section`
  width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg};

  display: flex;
  align-items: center;
  justify-content: center;
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
