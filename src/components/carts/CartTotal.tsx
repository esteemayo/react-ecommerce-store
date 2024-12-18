import styled, { css } from 'styled-components';
import { Token } from 'react-stripe-checkout';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PaymentButton from '../buttons/PaymentButton';
import CheckoutButton from '../buttons/CheckoutButton';

import { useAuth } from '../../hooks/useAuth';
import { useCartStore } from '../../hooks/useCartStore';

import { formatCurrency } from '../../utils/formatCurrency';
import { stripePayment } from '../../services/paymentService';

import { CartTotalProps } from '../../types';

const STRIPE_KEY = import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY as string;

const CartTotal = ({ isOpen, onOpen, onClose, onAction }: CartTotalProps) => {
  const navigate = useNavigate();

  const currentUser = useAuth((state) => state.user);
  const tax = useCartStore((state) => state.tax);
  const total = useCartStore((state) => state.total);
  const cart = useCartStore((state) => state.cart);
  const subtotal = useCartStore((state) => state.subtotal);

  const [show, setShow] = useState(false);
  const [stripeToken, setStripeToken] = useState<Token>();

  const onToken = useCallback((token: Token) => {
    setStripeToken(token);
  }, []);

  const handleOpen = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onAction();
    },
    [onAction]
  );

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
    if (stripeToken && total >= 1) {
      (async () => {
        try {
          const paymentObj = {
            tokenId: stripeToken?.id,
            amount: total * 100,
          };

          const { data } = await stripePayment(paymentObj);

          const state = {
            cart,
            data,
            email: currentUser.details.email,
            phone: currentUser.details.phone,
          };

          navigate('/success', { state });
        } catch (err: unknown) {
          console.log(err);
        }
      })();
    }
  }, [cart, currentUser, navigate, stripeToken, total]);

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
              <PaymentButton onOpen={handleOpen} />
              <CheckoutButton
                email={currentUser.details.email}
                total={total}
                stripeKey={STRIPE_KEY}
                onToken={onToken}
              />
            </ButtonWrapper>
          ) : (
            <Button type='button' className='btn-check' onClick={onOpen}>
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

  @media only screen and (min-width: 112.5em) {
    padding: 3rem 5rem;
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

  @media only screen and (min-width: 112.5em) {
    font-size: 2.5rem;
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

  @media only screen and (min-width: 112.5em) {
    font-size: 2rem;
  }
`;

const ButtonContainer = styled.div`
  padding: 1rem 0;
`;

const ButtonWrapper = styled.div``;

const Button = styled.button`
  border: none;
  display: inline-block;
  font-size: 1.5rem;
  width: 100%;
  padding: 1rem 3rem;
  background-color: ${({ theme }) => theme.bgCartBtn};
  color: ${({ theme }) => theme.textBtn};
  background-image: ${({ theme }) => css`
  linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    ${theme.bgImgCartBtn} 50%
  );
  `};
  background-size: 220%;
  border: 1px solid ${({ theme }) => theme.btnBorder};
  border-radius: 0.5rem;
  outline-color: ${({ theme }) => theme.btnCartOut};
  line-height: 1.3em;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;

  @media only screen and (max-width: 56.25em), only screen and (hover: none) {
    font-size: 1.49rem;
  }

  @media only screen and (max-width: 43.75em) {
    font-size: 1.47rem;
    padding: 1rem 2.7rem;
  }

  @media only screen and (max-width: 18.75em) {
    padding: 0.7rem 2rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 1.8rem;
    padding: 1.5rem 3.5rem;
  }

  &:hover {
    background-position: 100%;
  }
`;

export default CartTotal;
