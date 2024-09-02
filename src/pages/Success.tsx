import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import {
  faEnvelope,
  faLocationDot,
  faMessage,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useSubmenu } from '../hooks/useSubmenu';
import { useCartStore } from '../hooks/useCartStore';

import { createOrder } from '../services/orderService';
import { formatCurrency } from '../utils/formatCurrency';

import { CartValues } from '../types';

const Success = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const email = state.email;
  const phone = state.phone;
  const total = state.total;
  const address = state.address;

  const data = state.data;
  const cart: CartValues[] = state.cart;

  const reset = useCartStore((state) => state.reset);
  const closeSubmenu = useSubmenu((state) => state.closeSubmenu);

  const customerAddress = useMemo(() => {
    return data?.billing_details.address.line1 ?? address;
  }, [data, address]);

  const emailAddress = useMemo(() => {
    return data?.billing_details.email ?? email;
  }, [data, email]);

  const amount = useMemo(() => {
    return total;
  }, [total]);

  // useEffect(() => {
  //   if (data) {
  //     (async () => {
  //       try {
  //         const newOrder = {
  //           customer: data.billing_details.name,
  //           address: data.billing_details.address.line1,
  //           products: cart.map((item) => ({
  //             productId: item.id,
  //             quantity: item.quantity,
  //           })),
  //           total: data.amount,
  //           paymentMethod: 1,
  //         };

  //         const res = await createOrder(newOrder);

  //         setTimeout(() => {
  //           navigate(`/orders/${res.data._id}`);
  //         }, 5000);
  //       } catch (err: unknown) {
  //         console.log(err);
  //       }
  //     })();
  //   }

  //   return () => reset();
  // }, [cart, data, navigate, reset]);

  return (
    <Container onMouseOver={closeSubmenu}>
      <Wrapper>
        <SuccessContainer>
          <SuccessWrapper>
            <SuccessInfo>
              <SuccessAlert>Order successfully placed</SuccessAlert>
              <Text>
                Thank you for your order, you will receive it in{' '}
                <Minutes>45 minutes</Minutes>
              </Text>
              <InfoContainer>
                <InfoText>Here we will deliver your order.</InfoText>
                <IconContainer>
                  <FontAwesomeIcon icon={faLocationDot} />
                  <Address>{customerAddress}</Address>
                </IconContainer>
                {phone && (
                  <IconContainer>
                    <FontAwesomeIcon icon={faPhone} />
                    <Phone>{phone}</Phone>
                  </IconContainer>
                )}
                <IconContainer>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <Email>{emailAddress}</Email>
                </IconContainer>
              </InfoContainer>
              <MushroomContainer>
                <IconContainer>
                  <FontAwesomeIcon icon={faMessage} />
                  <MushroomText>&quot;No mushrooms, please&quot;</MushroomText>
                </IconContainer>
              </MushroomContainer>
              <TotalPayment>
                The payment of <Price>{formatCurrency(amount)}</Price>{' '}
                you&apos;ll make when the courier arrives with your order.
              </TotalPayment>
              <Link to='/orders'>
                <OrderButton type='button'>Order history</OrderButton>
              </Link>
            </SuccessInfo>
          </SuccessWrapper>
        </SuccessContainer>
      </Wrapper>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  padding: 10rem 0;
  background-color: ${({ theme }) => theme.bg};

  @media only screen and (max-width: 64em) {
    padding: 8rem 0;
  }

  @media only screen and (max-width: 28.125em) {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;

  @media only screen and (max-width: 64em) {
    max-width: 100rem;
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

  @media only screen and (min-width: 112.5em) {
    max-width: 140rem;
  }
`;

const SuccessContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SuccessWrapper = styled.div`
  width: 70rem;
  background-color: ${({ theme }) => theme.bgSuccess};
  padding: 4rem 7rem;
  border-radius: 0.5rem;

  @media only screen and (max-width: 43.75em) {
    width: 60rem;
    padding: 3rem 6rem;
  }

  @media only screen and (max-width: 35em) {
    width: 50rem;
    padding-left: 4.5rem;
    padding-right: 4.5rem;
  }

  @media only screen and (max-width: 28.125em) {
    width: 45rem;
    padding-left: 3rem;
    padding-right: 3rem;
  }

  @media only screen and (max-width: 18.75em) {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media only screen and (min-width: 112.5em) {
    width: 80rem;
    padding: 5rem;
  }
`;

const SuccessInfo = styled.div`
  max-width: 40rem;
  margin: 0 auto;

  @media only screen and (min-width: 112.5em) {
    max-width: 55rem;
  }

  a {
    &:link,
    &:visited {
      text-decoration: none;
      color: #409384;
      outline: none;
    }

    &:active {
      color: currentColor;
    }
  }
`;

const SuccessAlert = styled.p`
  display: inline-block;
  text-transform: uppercase;
  font-size: 1.3rem;
  padding: 0 0.5rem;
  color: #409384;
  border: 1px solid #409384;
  border-radius: 10rem;
  margin-bottom: 2rem;
  line-height: 1.8;

  @media only screen and (max-width: 43.75em) {
    font-size: 1.2rem;
    margin-bottom: 1.45rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 1.8rem;
    padding: 0 1rem;
  }
`;

const Text = styled.p`
  display: inline-block;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 2rem;

  @media only screen and (max-width: 43.75em) {
    margin-bottom: 1.45rem;
  }

  @media only screen and (max-width: 21.875em) {
    font-size: 1.4rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 2rem;
  }
`;

const Minutes = styled.span`
  font-weight: 600;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.bgInfo};
  color: currentColor;
  border-radius: 3px;
`;

const InfoContainer = styled.div`
  padding: 2.7rem 2.3rem;
  background-color: ${({ theme }) => theme.bgInfo};
  color: ${({ theme }) => theme.text};
  border-radius: 0.5rem;

  @media only screen and (max-width: 43.75em) {
    padding: 2.5rem 2rem;
  }

  @media only screen and (min-width: 112.5em) {
    padding: 3.2rem 2.8rem;
  }
`;

const InfoText = styled.p`
  display: inline-block;
  font-size: 1.37rem;
  margin-bottom: 1.5rem;

  @media only screen and (max-width: 43.75em) {
    margin-bottom: 1rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 1.87rem;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    color: ${({ theme }) => theme.successIcon};

    @media only screen and (min-width: 112.5em) {
      font-size: 1.8rem;
    }
  }
`;

const Address = styled.span`
  text-transform: capitalize;
  font-size: 1.5rem;

  @media only screen and (max-width: 21.875em) {
    font-size: 1.4rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 2rem;
  }
`;

const Phone = styled.span`
  font-size: 1.5rem;

  @media only screen and (max-width: 21.875em) {
    font-size: 1.4rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 2rem;
  }
`;

const Email = styled.span`
  text-transform: lowercase;
  font-size: 1.5rem;

  @media only screen and (max-width: 21.875em) {
    font-size: 1.4rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 2rem;
  }
`;

const MushroomContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem 2.3rem;
  background-color: ${({ theme }) => theme.bgInfo};
  color: ${({ theme }) => theme.text};
  border-radius: 0.5rem;

  @media only screen and (max-width: 43.75em) {
    padding: 1rem 2rem;
  }

  @media only screen and (min-width: 112.5em) {
    padding: 1.5rem 2.8rem;
  }
`;

const MushroomText = styled.span`
  font-size: 1.5rem;

  @media only screen and (max-width: 21.875em) {
    font-size: 1.4rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 1.8rem;
  }
`;

const TotalPayment = styled.p`
  display: inline-block;
  width: 90%;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.3;
  margin-top: 3rem;

  @media only screen and (max-width: 43.75em) {
    margin-top: 2rem;
  }

  @media only screen and (max-width: 21.875em) {
    font-size: 1.4rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 1.8rem;
  }
`;

const Price = styled.span``;

const OrderButton = styled.button`
  display: inline-block;
  border: none;
  font-size: 1.35rem;
  background-color: transparent;
  color: #409384;
  outline-color: #409384;
  outline-offset: 0.5rem;
  margin-top: 3rem;
  cursor: pointer;
  transition: all 0.3s ease;

  @media only screen and (max-width: 43.75em) {
    margin-top: 2rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 1.75rem;
  }

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 3px;
    background-color: #409384;
    margin-top: 0.5rem;

    @media only screen and (max-width: 43.75em) {
      height: 2px;
      margin-top: 3px;
    }
  }

  &:hover {
    opacity: 0.85;
  }
`;

export default Success;
