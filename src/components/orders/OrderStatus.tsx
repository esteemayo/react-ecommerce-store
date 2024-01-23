import { useMemo } from 'react';
import styled from 'styled-components';

import { orderStatus } from '../../data';
import { useDarkMode } from '../../hooks/useDarkMode';

import OrderStatusItem from './OrderStatusItem';

interface OrderStatusProps {
  statusClass(index: number): 'done' | 'inProgress' | 'undone' | undefined;
}

const OrderStatus = ({ statusClass }: OrderStatusProps) => {
  const mode = useDarkMode((state) => state.mode);

  const activeMode = useMemo(() => {
    return mode.toString();
  }, [mode]);

  return (
    <Container>
      {orderStatus.map((item) => {
        return (
          <OrderStatusItem
            key={item.id}
            {...item}
            statusClass={statusClass}
            mode={activeMode}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.section`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 25em) {
    width: 90%;
  }
`;

export default OrderStatus;
