import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDarkMode } from '../../hooks/useDarkMode';
import { useAuth } from '../../hooks/useAuth';
import { useCartStore } from '../../hooks/useCartStore';
import { useForm } from '../../hooks/useForm';

import Overlay from './Overlay';
import OrderDetails from '../orders/OrderDetails';

import { createOrder } from '../../services/orderService';
import { validatePayment } from '../../validations/payment';

import { PaymentData, PaymentErrors, PaymentModalProps } from '../../types';

const initialState: PaymentData = {
  name: '',
  address: '',
};

const initialError: PaymentErrors = {
  name: '',
  address: '',
};

const PaymentModal = ({ isOpen, onClose, onExit }: PaymentModalProps) => {
  const navigate = useNavigate();

  const mode = useDarkMode((state) => state.mode);
  const total = useCartStore((state) => state.total);
  const cart = useCartStore((state) => state.cart);
  const currentUser = useAuth((state) => state.user);
  const reset = useCartStore((state) => state.reset);

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const closeHandler = () => {
    setShowModal(false);
    onClose();
    handleClose();
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const target = e.target as Element;

    if (target.classList.contains('overlay')) {
      closeHandler();
    }
  };

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler();
      }
    },
    [closeHandler]
  );

  const onSubmitHandler = async () => {
    setIsLoading(true);

    try {
      const newOrder = {
        customer: currentUser.details.name,
        address: data.address,
        products: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        total,
        paymentMethod: 0,
      };

      const res = await createOrder(newOrder);

      const state = {
        cart,
        total: res.data.total,
        address: res.data.address,
        email: currentUser.details.email,
        phone: currentUser.details.phone,
      };

      onExit();
      onClose();
      navigate('/success', { state });
    } catch (err: unknown) {
      console.log(err);
    } finally {
      reset();
      setIsLoading(false);
    }
  };

  const { errors, data, handleChange, handleClose, handleSubmit } = useForm(
    onSubmitHandler,
    initialState,
    initialError,
    validatePayment,
    onExit
  );

  const activeModal = useMemo(() => {
    return showModal ? 'show' : '';
  }, [showModal]);

  const modeValue = useMemo(() => {
    return mode.toString();
  }, [mode]);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  if (!isOpen) {
    return null;
  }

  return (
    <Overlay type={activeModal} mode={modeValue} onClick={handleClick}>
      <Wrapper>
        <CloseButtonContainer>
          <CloseButton type='button' onClick={closeHandler}>
            <CloseIcon />
          </CloseButton>
        </CloseButtonContainer>
        <OrderDetails
          name={data.name}
          address={data.address}
          total={total}
          isLoading={isLoading}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </Wrapper>
    </Overlay>
  );
};

const Wrapper = styled.div`
  width: 40rem;
  padding: 2rem 4rem;
  background-color: ${({ theme }) => theme.bgModal};
  border-radius: 1rem;
  position: relative;

  @media only screen and (max-width: 25em) {
    width: 35rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media only screen and (max-width: 18.75em) {
    width: 33rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media only screen and (min-width: 112.5em) {
    width: 50rem;
    padding: 2rem;
  }
`;

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 0;
  width: 4rem;
  height: 4rem;
`;

const CloseButton = styled.button`
  display: inline-block;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 2.3rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textPayModal};
  outline-color: ${({ theme }) => theme.payModalOut};
  cursor: pointer;

  svg {
    font-size: 2.3rem;
    fill: currentColor;

    @media only screen and (min-width: 112.5em) {
      font-size: 3rem;
    }
  }
`;

export default PaymentModal;
