'use client';

import styled from 'styled-components';

import { useCart } from '@/hooks/useCart';
import BreadCrumbs from '@/app/products/[id]/BreadCrumbs';

import ColorSelect from '../inputs/ColorSelect';
import Counter from '../inputs/Counter';
import SizeSelect from '../inputs/SizeSelect';

import ProductHead from './ProductHead';
import ProductButton from './ProductButton';
import ProductInfo from './ProductInfo';
import ProductImages from './ProductImages';
import ProductValue from './ProductValue';

import { productValue } from '@/data';
import { ProductProps } from '@/types';

import Alert from '../Alert';
import { useDarkMode } from '@/hooks/useDarkMode';

const Product = ({ product, inCart, actionLabel }: ProductProps) => {
  const mode = useDarkMode((state) => state.mode);

  const {
    alert,
    setAlert,
    handleClick,
    selectedSize,
    isSelected,
    quantity,
    setQuantity,
    setSize,
    setSelectedSize,
    setIsSelected,
    setColor,
  } = useCart(product);

  return (
    <Container>
      <ProductContainer>
        <Left>
          <ProductImages images={product.images} />
        </Left>
        <Right>
          <BreadCrumbs category={product.category} />
          <ProductWrapper>
            <ProductHead
              name={product.name}
              price={product.price}
              discount={product.discount}
              priceDiscount={product.priceDiscount}
              ratingsAverage={product.ratingsAverage}
              ratingsQuantity={product.ratingsQuantity}
            />
            <Hr />
            <ColorSelect
              title='Color'
              mode={mode}
              value={product.color}
              selected={isSelected}
              onAction={setColor}
              secondaryAction={setIsSelected}
            />
            <SizeSelect
              value={product.size}
              title='Select a size'
              selected={selectedSize}
              onAction={setSize}
              secondaryAction={setSelectedSize}
            />
            <Hr />
            <Counter title='Quantity' value={quantity} onClick={setQuantity} />
            <Hr />
            <ProductButton
              actionLabel={actionLabel}
              inCart={inCart}
              onAction={handleClick}
            />
            {alert && (
              <Alert
                alert={alert}
                onChange={setAlert}
                message='Item added to cart'
              />
            )}
            <Hr />
            <ProductValue items={productValue} mode={mode.toString()} />
            <Hr />
            <ProductInfo title='Overview' content={product.desc} />
          </ProductWrapper>
        </Right>
      </ProductContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const ProductContainer = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin-bottom: 3rem;

  @media only screen and (max-width: 64em) {
    max-width: 100rem;
  }

  @media only screen and (max-width: 59.375em) {
    max-width: 80rem;
  }

  @media only screen and (max-width: 50em) {
    max-width: 70rem;
    flex-direction: column;
  }

  @media only screen and (max-width: 37.5em) {
    padding-left: 5rem;
    padding-right: 5rem;
  }

  @media only screen and (max-width: 25em) {
    padding-left: 3rem;
    padding-right: 3rem;
  }
`;

const Left = styled.div`
  flex: 2;
  padding: 1rem 0;
`;

const Right = styled.div`
  flex: 1;
  padding-top: 5rem;
  padding-right: 3rem;
  padding-left: 3rem;

  @media only screen and (max-width: 64em) {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media only screen and (max-width: 50em) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const ProductWrapper = styled.div`
  margin-top: 2rem;

  @media only screen and (max-width: 37.5em) {
    margin-top: 1.5rem;
  }
`;

const Hr = styled.hr`
  width: 100%;
  height: 1px;
  border: none;
  background-color: ${({ theme }) => theme.cartModalBorder};
`;

export default Product;
