import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import OrderInfo from '../components/orders/OrderInfo';
import OrderTable from '../components/orders/OrderTable';
import OrderStatus from '../components/orders/OrderStatus';

import Loader from '../components/Loader';

import { useSubmenu } from '../hooks/useSubmenu';
import { getOrder } from '../services/orderService';

const Order = () => {
  const { pathname } = useLocation();
  const orderId = pathname.split('/').pop();

  const closeSubmenu = useSubmenu((state) => state.closeSubmenu);

  const [status, setStatus] = useState(0);

  const { isLoading, data: order } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data } = await getOrder(orderId!);
      setStatus(data.status);
      return data;
    },
  });

  const statusClass = (index: number) => {
    if (index - status < 1) return 'done';
    if (index - status === 1) return 'inProgress';
    if (index - status > 1) return 'undone';
  };

  if (isLoading) {
    return (
      <Container>
        <Loader size='md' title='Loading...' />
      </Container>
    );
  }

  return (
    <Container onMouseOver={closeSubmenu}>
      <Box>
        <Wrapper>
          <OrderContainer>
            <Left>
              <OrderTable {...order} />
              <OrderStatus statusClass={statusClass} />
            </Left>
            <OrderInfo total={order.total} />
          </OrderContainer>
        </Wrapper>
      </Box>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  min-height: 80vh;
  background-color: ${({ theme }) => theme.bg};
`;

const Box = styled.div`
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
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;

  @media only screen and (max-width: 64em) {
    max-width: 85rem;
  }

  @media only screen and (max-width: 50em) {
    max-width: 80rem;
  }
`;

const OrderContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3rem;

  @media only screen and (max-width: 37.5em) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 2;

  @media only screen and (max-width: 37.5em) {
    width: 100%;
  }
`;

export default Order;
