import { useMemo } from 'react';
import styled from 'styled-components';

import ColorSelect from '../inputs/ColorSelect';
import Counter from '../inputs/Counter';
import SizeSelect from '../inputs/SizeSelect';

import ProductHead from './ProductHead';
import ProductButton from './ProductButton';
import ProductInfo from './ProductInfo';
import ProductImages from './ProductImages';
import ProductValue from './ProductValue';

import Alert from '../Alert';
import ProductButtons from './ProductButtons';
import Views from '../Views';
import BreadCrumbs from '../../pages/product/BreadCrumbs';

import { productValue } from '../../data';
import { ProductProps } from '../../types';

import { useCart } from '../../hooks/useCart';
import { useDarkMode } from '../../hooks/useDarkMode';

const Product = ({
  product,
  views,
  inCart,
  actionLabel,
  currentUser,
  onFavorite,
}: ProductProps) => {
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

  const activeMode = useMemo(() => {
    return mode.toString();
  }, [mode]);

  return (
    <Container>
      <ProductContainer>
        <Left>
          <ProductImages images={product.images} />
        </Left>
        <Right>
          <BreadCrumbs category={product.category} />
          <Views totalViews={views[0]?._id} />
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
              mode={activeMode}
              value={product.color}
              selected={isSelected}
              onAction={setColor}
              secondaryAction={setIsSelected}
            />
            {product.size.length > 0 && (
              <SizeSelect
                value={product.size}
                title='Select a size'
                selected={selectedSize}
                onAction={setSize}
                secondaryAction={setSelectedSize}
              />
            )}
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
            <ProductButtons
              actionId={product.id}
              alert={alert}
              currentUser={currentUser}
              product={product}
              likes={product.likes}
              onFavorite={onFavorite}
            />
            <Hr />
            <ProductValue items={productValue} mode={mode} />
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
