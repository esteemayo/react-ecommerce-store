import styled from 'styled-components';
import { useCallback, useState } from 'react';

import EmptyCart from '../components/carts/EmptyCart';
import PaymentModal from '../components/modals/PaymentModal';
import CartItem from '../components/carts/CartItem';
import CartHeader from '../components/carts/CartHeader';
import CartTotal from '../components/carts/CartTotal';

import { usePaymentModal } from '../hooks/usePaymentModal';
import { useSubmenu } from '../hooks/useSubmenu';
import { useCartStore } from '../hooks/useCartStore';

const Cart = () => {
  const cart = useCartStore((state) => state.cart);

  const paymentModal = usePaymentModal();
  const closeSubmenu = useSubmenu((state) => state.closeSubmenu);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  let bodyContent: JSX.Element;

  if (cart.length < 1) {
    bodyContent = <EmptyCart />;
  } else {
    bodyContent = (
      <Wrapper>
        <CartHeader />
        <CartItemsContainer>
          {cart.map((cart) => {
            return <CartItem key={cart.id} {...cart} />;
          })}
        </CartItemsContainer>
        <CartTotal
          isOpen={isOpen}
          onOpen={handleOpen}
          onClose={handleClose}
          onAction={paymentModal.onOpen}
        />
      </Wrapper>
    );
  }

  return (
    <Container onMouseOver={closeSubmenu}>
      <CartContainer>{bodyContent}</CartContainer>
      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={handleClose}
        onExit={paymentModal.onClose}
      />
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  background-color: ${({ theme }) => theme.bg};
`;

const CartContainer = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  padding: 10rem 0;

  @media only screen and (max-width: 64em) {
    max-width: 100rem;
    padding: 8rem 0;
  }

  @media only screen and (max-width: 59.375em) {
    max-width: 80rem;
  }

  @media only screen and (max-width: 50em) {
    max-width: 70rem;
  }

  @media only screen and (max-width: 37.5em) {
    padding-left: 5rem;
    padding-right: 5rem;
  }

  @media only screen and (max-width: 25em) {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  @media only screen and (max-width: 23.75em) {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media only screen and (max-width: 18.75em) {
    padding-left: 1.3rem;
    padding-right: 1.3rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  box-shadow: ${({ theme }) => theme.boxCart};
  -webkit-box-shadow: ${({ theme }) => theme.boxCart};
  -moz-box-shadow: ${({ theme }) => theme.boxCart};
  border-radius: 1rem;
`;

const CartItemsContainer = styled.div`
  padding: 0.5rem 5rem 3rem 5rem;

  @media only screen and (max-width: 43.75em) {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  @media only screen and (max-width: 37.5em) {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media only screen and (max-width: 18.75em) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

export default Cart;
