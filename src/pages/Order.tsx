import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

import OrderTable from '../components/orders/OrderTable';
import OrderInfo from '../components/orders/OrderInfo';
import OrderStatus from '../components/orders/OrderStatus';

import Loader from '../components/Loader';
import EmptyState from '../components/empty/EmptyState';

import { useSubmenu } from '../hooks/useSubmenu';
import { getOrder } from '../services/orderService';

const fetchOrder = async (orderId: string) => {
  const { data } = await getOrder(orderId);
  return data;
};

const Order = () => {
  const { pathname } = useLocation();
  const orderId = pathname.split('/').pop();

  const closeSubmenu = useSubmenu((state) => state.closeSubmenu);

  const [status, setStatus] = useState(0);

  const { isLoading, data: order } = useQuery({
    queryKey: ['orders'],
    queryFn: () => fetchOrder(orderId!),
    enabled: !!orderId,
  });

  const statusClass = useCallback(
    (index: number) => {
      if (index - status < 1) return 'done';
      if (index - status === 1) return 'inProgress';
      if (index - status > 1) return 'undone';
    },
    [status]
  );

  useEffect(() => {
    order && setStatus(order.status);
  }, [order]);

  if (isLoading) {
    return (
      <Container>
        <Loader size='md' title='Loading...' />
      </Container>
    );
  }

  if (!order) {
    return <EmptyState title='No order found with the given ID!' />;
  }

  return (
    <Container onMouseOver={closeSubmenu}>
      <Box>
        <Wrapper>
          <OrderContainer>
            <OrderWrapper>
              <OrderTable order={order} />
              <OrderStatus statusClass={statusClass} />
            </OrderWrapper>
            <OrderInfo total={order.total} />
          </OrderContainer>
        </Wrapper>
      </Box>
    </Container>
  );
};

const Container = styled.main`
  width: 100%;
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

  @media only screen and (min-width: 112.5em) {
    max-width: 140rem;
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

  @media only screen and (min-width: 112.5em) {
    max-width: 140rem;
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

  @media only screen and (min-width: 112.5em) {
    gap: 5rem;
  }
`;

const OrderWrapper = styled.div`
  flex: 2;

  @media only screen and (max-width: 37.5em) {
    width: 100%;
  }
`;

export default Order;
