import { useMemo } from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../hooks/useDarkMode';
import { orderStatus } from '../../data';

interface OrderStatusProps {
  statusClass(index: number): 'done' | 'inProgress' | 'undone' | undefined;
}

interface IMode {
  mode: string;
}

const OrderStatus = ({ statusClass }: OrderStatusProps) => {
  const mode = useDarkMode((state) => state.mode);

  const activeMode = useMemo(() => {
    return mode.toString();
  }, [mode]);

  return (
    <Container>
      {orderStatus.map((item) => {
        const { id, icon, text, status } = item;
        return (
          <StatusWrapper
            key={id}
            className={statusClass(status)}
            mode={activeMode}
          >
            <Image src={icon} width={30} height={30} alt='' />
            <Status>{text}</Status>
            <Image
              src='/img/checked.png'
              width={20}
              height={20}
              alt=''
              className='checkedIcon'
            />
          </StatusWrapper>
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

const StatusWrapper = styled.div<IMode>`
  img:first-child {
    width: 3rem;
    height: 3rem;
    display: block;
    object-fit: cover;
    background-color: ${({ mode }) => setBcg(mode)};
  }

  img:last-child {
    width: 2rem;
    height: 2rem;
    object-fit: cover;
  }
`;

const Image = styled.img``;

const Status = styled.span`
  color: ${({ theme }) => theme.text};

  @media only screen and (max-width: 37.5em) {
    font-size: 1.5rem;
  }
`;

const setBcg = (mode: string) => {
  return mode === 'true' ? '#1b1a1a' : undefined;
};

export default OrderStatus;
