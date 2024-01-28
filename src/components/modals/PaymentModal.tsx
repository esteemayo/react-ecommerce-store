import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDarkMode } from '../../hooks/useDarkMode';
import { useAuth } from '../../hooks/useAuth';
import { useCartStore } from '../../hooks/useCartStore';
import { useForm } from '../../hooks/useForm';

import Overlay from './Overlay';
import OrderDetails from '../orders/OrderDetails';

import { PaymentModalProps } from '../../types';
import { createOrder } from '../../services/orderService';

interface FormData {
  name: string;
  address: string;
}

interface IErrors {
  name?: string;
  address?: string;
}

const initialState: FormData = {
  name: '',
  address: '',
};

const initialError: IErrors = {
  name: '',
  address: '',
};

const PaymentModal = ({ isOpen, onClose, onExit }: PaymentModalProps) => {
  const navigate = useNavigate();

  const mode = useDarkMode((state) => state.mode);
  const total = useCartStore((state) => state.total);
  const cart = useCartStore((state) => state.cart);
  const reset = useCartStore((state) => state.reset);
  const currentUser = useAuth((state) => state.user);

  const [showModal, setShowModal] = useState(isOpen);

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

  const validateForm = (data: FormData) => {
    const errors: IErrors = {};
    const { address, name } = data;

    if (name.trim() === '') {
      errors.name = 'Please enter your name';
    }

    if (address.trim() === '') {
      errors.address = 'Please enter your address';
    }

    return errors;
  };

  const onSubmitHandler = async () => {
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

      onClose();
      reset();
      navigate('/success', { state });
    } catch (err: unknown) {
      console.log(err);
    }
  };

  const { errors, data, handleChange, handleClose, handleSubmit } = useForm(
    onSubmitHandler,
    initialState,
    initialError,
    validateForm,
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
  outline-color: #f7f3f8;
  cursor: pointer;

  svg {
    font-size: 2.3rem;
    fill: currentColor;
  }
`;

export default PaymentModal;
