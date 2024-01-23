import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import OrderCard from '../components/orders/OrderCard';
import { CommonImage } from '../components/CommonImage';

import { useSubmenu } from '../hooks/useSubmenu';
import { getUserOrders } from '../services/orderService';
import { OrderType } from '../types';

const Orders = () => {
  const closeSubmenu = useSubmenu((state) => state.closeSubmenu);

  const { isLoading, data, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data } = await getUserOrders();
      return data;
    },
  });

  console.log(data);

  let bodyContent: JSX.Element | undefined;

  if (data.length < 1) {
    bodyContent = (
      <ImageContainer>
        <StyledImage
          src='/img/empty-list.png'
          width={500}
          height={500}
          alt=''
        />
        <Message>No orders found</Message>
      </ImageContainer>
    );
  }

  if (data.length > 0) {
    bodyContent = (
      <>
        <Heading>Order history</Heading>
        <OrderContainer>
          {data.map((order: OrderType) => {
            return <OrderCard key={order._id} {...order} />;
          })}
        </OrderContainer>
      </>
    );
  }

  return (
    <Container onMouseOver={closeSubmenu}>
      <Wrapper>{bodyContent}</Wrapper>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  padding: 10rem 0;

  @media only screen and (max-width: 64em) {
    padding-top: 8rem;
    padding-bottom: 8rem;
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
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled(CommonImage)`
  width: 30rem;
  height: 30rem;
`;

const Message = styled.span`
  display: block;
  font-size: 3rem;
  margin-top: -5rem;

  @media only screen and (max-width: 37.5em) {
    font-size: 2.5rem;
  }
`;

const Heading = styled.h1`
  display: inline-block;
  text-transform: capitalize;
  font-weight: 500;
  font-size: 2.8rem;

  @media only screen and (max-width: 64em) {
    font-size: 2.5rem;
  }
`;

const OrderContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 3rem;
`;

export default Orders;
