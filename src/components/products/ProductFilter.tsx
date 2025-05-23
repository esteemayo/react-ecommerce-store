import styled from 'styled-components';

import Heading from '../filters/Heading';
import Option from '../filters/Option';
import RangeInput from '../filters/RangeInput';
import Select from '../filters/Select';

import { getUnique } from '../../utils';
import { ProductFilterProps } from '../../types';

const ProductFilter = ({
  products,
  price,
  category,
  size,
  color,
  minPrice,
  maxPrice,
  onChangeColor,
  onChangeCategory,
  onChangeSize,
  onChangePrice,
}: ProductFilterProps) => {
  const allColors = ['all', ...getUnique(products, 'color')];
  const colors = allColors.map((color, index) => {
    return <Option key={index} value={color} />;
  });

  const allCategories = ['all', ...getUnique(products, 'category')];
  const categories = allCategories.map((category, index) => {
    return <Option key={index} value={category} />;
  });

  const allSizes = ['all', ...getUnique(products, 'size')];
  const sizes = allSizes.map((size, index) => {
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
          onChange={onChangeColor}
        />
        <Select
          name='category'
          label='Category'
          page='product'
          value={category}
          options={categories}
          onChange={onChangeCategory}
        />
        <Select
          name='size'
          label='Product size'
          page='product'
          value={size}
          options={sizes}
          onChange={onChangeSize}
        />
        <RangeInput
          name='price'
          label='Product price'
          price={price}
          value={price}
          min={minPrice}
          max={maxPrice}
          onChange={onChangePrice}
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
  justify-content: space-between;

  @media only screen and (max-width: 64em) {
    gap: 5rem;
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
