'use client';

import styled from 'styled-components';
import Image from 'next/image';

import { useDarkMode } from '@/hooks/useDarkMode';

interface OrderStatusProps {
  statusClass(index: number): string;
}

interface IMode {
  mode: boolean;
}

const OrderStatus = ({ statusClass }: OrderStatusProps) => {
  const mode = useDarkMode((state) => state.mode);

  return (
    <Container>
      <StatusWrapper className={statusClass(0)} mode={mode}>
        <Image src='/img/paid.png' width={30} height={30} alt='' />
        <Status>Payment</Status>
        <Image
          src='/img/checked.png'
          width={20}
          height={20}
          alt=''
          className='checkedIcon'
        />
      </StatusWrapper>
      <StatusWrapper className={statusClass(1)} mode={mode}>
        <Image src='/img/bake.png' width={30} height={30} alt='' />
        <Status>Preparing</Status>
        <Image
          src='/img/checked.png'
          width={20}
          height={20}
          alt=''
          className='checkedIcon'
        />
      </StatusWrapper>
      <StatusWrapper className={statusClass(2)} mode={mode}>
        <Image src='/img/bike.png' width={30} height={30} alt='' />
        <Status>On the way</Status>
        <Image
          src='/img/checked.png'
          width={20}
          height={20}
          alt=''
          className='checkedIcon'
        />
      </StatusWrapper>
      <StatusWrapper className={statusClass(3)} mode={mode}>
        <Image src='/img/delivered.png' width={30} height={30} alt='' />
        <Status>Delivered</Status>
        <Image
          src='/img/checked.png'
          width={20}
          height={20}
          alt=''
          className='checkedIcon'
        />
      </StatusWrapper>
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
    background-color: ${({ mode }) => mode && '#1b1a1a'};
  }

  img:last-child {
    width: 2rem;
    height: 2rem;
    object-fit: cover;
  }
`;

const Status = styled.span`
  color: ${({ theme }) => theme.text};

  @media only screen and (max-width: 37.5em) {
    font-size: 1.5rem;
  }
`;

export default OrderStatus;
