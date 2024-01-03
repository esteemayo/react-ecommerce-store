'use client';

import styled from 'styled-components';

import Heading from '../filters/Heading';
import Option from '../filters/Option';
import RangeInput from '../filters/RangeInput';
import Select from '../filters/Select';

import { getUnique } from '@/utils';
import { ProductFilterProps } from '@/types';

const ProductFilter = ({
  products,
  price,
  category,
  size,
  color,
  minPrice,
  maxPrice,
  setCategory,
  setSize,
  setColor,
  setPrice,
}: ProductFilterProps) => {
  let colors = ['all', ...getUnique(products, 'color')];
  colors = colors.map((color, index) => {
    return <Option key={index} value={color} />;
  });

  let categories = ['all', ...getUnique(products, 'category')];
  categories = categories.map((category, index) => {
    return <Option key={index} value={category} />;
  });

  let sizes = ['all', ...getUnique(products, 'size')];
  sizes = sizes.map((size, index) => {
    return <Option key={index} value={size} />;
  });

  return (
    <Container>
      <Heading title='Filter by' />
      <Wrapper>
        <Select
          name='color'
          label='Color'
          page='product'
          value={color}
          options={colors}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setColor(e.target.value)
          }
        />
        <Select
          name='category'
          label='Category'
          page='product'
          value={category}
          options={categories}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCategory(e.target.value)
          }
        />
        <Select
          name='size'
          label='Product size'
          page='product'
          value={size}
          options={sizes}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSize(e.target.value)
          }
        />
        <RangeInput
          name='price'
          label='Product price'
          price={price}
          value={price}
          min={minPrice}
          max={maxPrice}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPrice(+e.target.value)
          }
        />
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  padding: 7rem 0;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 7rem;

  @media only screen and (max-width: 59.375em) {
    gap: 4rem;
  }

  @media only screen and (max-width: 37.5em) {
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

export default ProductFilter;
