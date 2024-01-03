'use client';

import styled from 'styled-components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import ColorSelect from '../inputs/ColorSelect';
import Counter from '../inputs/Counter';
import SizeSelect from '../inputs/SizeSelect';

import ProductHead from '../products/ProductHead';
import ProductButton from '../products/ProductButton';

import { useCart } from '@/hooks/useCart';
import { useDarkMode } from '@/hooks/useDarkMode';

import { CartModalProps } from '@/types';
import { useCartStore } from '@/hooks/useCartStore';

import Alert from '../Alert';
import { CommonImage } from '../CommonImage';

interface IMode {
  mode: string;
}

interface IWrapper {
  active: string;
}

const CartModal = ({ product, isOpen, onClose, onSelect }: CartModalProps) => {
  const mode = useDarkMode((state) => state.mode);
  const cart = useCartStore((state) => state.cart);

  const [showModal, setShowModal] = useState(isOpen);

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
    handleReset,
  } = useCart(product);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    onSelect(null);
    handleReset();

    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, onSelect, handleReset]);

  const closeModalHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      const target = e.target as Element;

      if (target.classList.contains('overlay')) {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );

  const activeModal = useMemo(() => {
    return showModal?.toString();
  }, [showModal]);

  const modeValue = useMemo(() => {
    return mode.toString();
  }, [mode]);

  const inCart = useMemo(() => {
    const cartItem = cart.find((item) => item.id === product?.id);
    return !!cartItem;
  }, [cart, product]);

  const actionLabel = useMemo(() => {
    return `${inCart ? 'Added' : 'Add'} to cart`;
  }, [inCart]);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <Overlay mode={modeValue} onClick={closeModalHandler} className='overlay'>
      <Wrapper active={activeModal}>
        <Box mode={modeValue}>
          <ButtonContainer>
            <CloseButton type='button' onClick={handleCloseModal}>
              <CloseIcon />
            </CloseButton>
          </ButtonContainer>
          <ImageContainer>
            <StyledImage
              src={product?.images?.[0] ?? '/img/img-1.jpg'}
              width={320}
              height={200}
              alt=''
            />
          </ImageContainer>
          <ProductContainer>
            <ProductHead
              name={product?.name}
              price={product?.price}
              discount={product?.discount}
              priceDiscount={product?.priceDiscount}
              modal
            />
            <Hr />
            <ColorSelect
              title='Color'
              mode={mode}
              value={product?.color}
              selected={isSelected}
              onAction={setColor}
              secondaryAction={setIsSelected}
              modal
            />
            {product?.size && (
              <SizeSelect
                value={product.size}
                selected={selectedSize}
                onAction={setSize}
                secondaryAction={setSelectedSize}
                modal
              />
            )}
            <Hr />
            <Counter title='Quantity' value={quantity} onClick={setQuantity} />
            <Hr />
            <ProductButton
              small
              actionLabel={actionLabel}
              inCart={inCart}
              onAction={handleClick}
            />
            {alert && (
              <Alert
                alert={alert}
                message='Item added to cart'
                onChange={setAlert}
                center
              />
            )}
          </ProductContainer>
        </Box>
      </Wrapper>
    </Overlay>
  );
};

const Overlay = styled.aside<IMode>`
  width: 100vw;
  height: 100%;
  background-color: ${({ theme }) => theme.bgOverlay};
  backdrop-filter: ${({ mode }) => (mode === 'true' ? 'blur(2px)' : undefined)};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4000;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div<IWrapper>`
  transform: translateY(${({ active }) => (active === 'true' ? 0 : '100%')});
  opacity: ${({ active }) => (active === 'true' ? 1 : 0)};
  transition: all 300ms;
`;

const Box = styled.div<IMode>`
  width: 40rem;
  padding: 2rem 4rem;
  background-color: ${({ theme }) => theme.bgModal};
  border-radius: 1.5rem;
  box-shadow: ${({ mode }) => setBoxShadow(mode)};
  -webkit-box-shadow: ${({ mode }) => setBoxShadow(mode)};
  -moz-box-shadow: ${({ mode }) => setBoxShadow(mode)};
  position: relative;

  @media only screen and (max-width: 37.5em) {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  @media only screen and (max-width: 25em) {
    width: 37rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media only screen and (max-width: 18.75em) {
    width: 33rem;
    padding-left: 1.2rem;
    padding-right: 1.2rem;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 1rem;
`;

const CloseButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.bgModalCloseBtn};
  color: #a2a8b0;
  border-radius: 50%;
  outline-color: #f1e4f4;
  cursor: pointer;

  svg {
    font-size: 1.8rem;
    fill: currentColor;
  }
`;

const ImageContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  height: 20rem;
  background-color: #ede9e6;

  @media only screen and (max-width: 25em) {
    display: none;
  }
`;

const StyledImage = styled(CommonImage)`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
`;

const ProductContainer = styled.div`
  margin-top: 0.5rem;
`;

const Hr = styled.hr`
  width: 100%;
  height: 1px;
  border: none;
  background-color: ${({ theme }) => theme.cartModalBorder};
`;

const setBoxShadow = (mode: string) => {
  return mode === 'true' ? 'none' : '0 2rem 4rem rgba(145, 143, 143, 0.1)';
};

export default CartModal;
