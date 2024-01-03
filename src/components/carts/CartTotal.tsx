'use client';

import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';

import { useCartStore } from '@/hooks/useCartStore';
import { CartTotalProps } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';

interface IBtn {
  btnType?: string;
}

const CartTotal = ({ isOpen, onOpen, onClose, onAction }: CartTotalProps) => {
  const tax = useCartStore((state) => state.tax);
  const subtotal = useCartStore((state) => state.subtotal);
  const total = useCartStore((state) => state.total);

  const [show, setShow] = useState(isOpen);

  const handleClose = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      const target = e.target as Element;

      if (!target.classList.contains('btn-pay')) {
        setShow(false);
        onClose();
      }

      if (target.classList.contains('btn-check')) {
        onOpen();
      }
    },
    [onOpen, onClose]
  );

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  return (
    <Container onClick={handleClose}>
      <Wrapper>
        <TotalContainer>
          <TotalWrapper>
            <Text>Subtotal:</Text>
            <PriceTotal>{formatCurrency(subtotal)}</PriceTotal>
          </TotalWrapper>
        </TotalContainer>
        <TotalContainer>
          <TotalWrapper>
            <Text>Tax:</Text>
            <PriceTotal>{formatCurrency(tax)}</PriceTotal>
          </TotalWrapper>
        </TotalContainer>
        <TotalContainer>
          <TotalWrapper>
            <Text>Total:</Text>
            <PriceTotal>{formatCurrency(total)}</PriceTotal>
          </TotalWrapper>
        </TotalContainer>
        <ButtonContainer>
          {show ? (
            <ButtonWrapper>
              <Button type='button' className='btn-pay' onClick={onAction}>
                Pay on Delivery
              </Button>
              <Button type='button' className='btn-pay'>
                Checkout Now
              </Button>
            </ButtonWrapper>
          ) : (
            <Button
              type='button'
              className='btn-check'
              btnType='check'
              onClick={onOpen}
            >
              Checkout
            </Button>
          )}
        </ButtonContainer>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 23rem;
  padding: 2rem 5rem;
  border-top: 1px solid ${({ theme }) => theme.cartBorder};
  line-height: 1.2;

  @media only screen and (max-width: 43.75em) {
    padding-left: 3rem;
    padding-right: 3rem;
    padding-bottom: 1rem;
  }

  @media only screen and (max-width: 37.5em) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  margin-top: 1.5rem;
`;

const TotalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TotalWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Text = styled.h3`
  display: inline-block;
  text-transform: capitalize;
  font-weight: 500;
  font-size: 2.3rem;
  color: ${({ theme }) => theme.text};

  @media only screen and (max-width: 43.75em) {
    font-size: 2.27rem;
  }

  @media only screen and (max-width: 18.75em) {
    font-size: 2rem;
  }
`;

const PriceTotal = styled.span`
  font-weight: 600;
  font-size: 1.7rem;
  font-variant: tabular-nums;
  color: ${({ theme }) => theme.text};

  @media only screen and (max-width: 43.75em) {
    font-size: 1.67rem;
  }
`;

const ButtonContainer = styled.div`
  padding: 1rem 0;
`;

const ButtonWrapper = styled.div``;

const Button = styled.button<IBtn>`
  border: none;
  display: inline-block;
  font-size: 1.5rem;
  width: 100%;
  padding: ${({ btnType }) =>
    btnType === 'check' ? '1rem 3rem' : '1rem 0.5rem'};
  background-color: ${({ theme }) => theme.bgCartBtn};
  color: ${({ theme }) => theme.textBtn};
  background-image: linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    #333 50%
  );
  background-size: 220%;
  border: 1px solid var(--clr-black);
  border-radius: 0.5rem;
  outline-color: #777;
  line-height: 1.3em;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;

  @media only screen and (max-width: 56.25em), only screen and (hover: none) {
    font-size: 1.49rem;
  }

  @media only screen and (max-width: 43.75em) {
    font-size: 1.47rem;
    padding: ${({ btnType }) => btnType === 'check' && '1rem 2.7rem'};
  }

  @media only screen and (max-width: 18.75em) {
    padding: ${({ btnType }) =>
      btnType === 'check' ? '0.7rem 2rem' : '0.7rem 0.5rem'};
  }

  &:hover {
    background-position: 100%;
  }
`;

export default CartTotal;
