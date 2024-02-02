import styled from 'styled-components';

import { OrderStatusItemProps } from '../../types';

interface IMode {
  mode: string;
}

const OrderStatusItem = ({
  icon,
  src,
  text,
  status,
  statusClass,
  mode,
}: OrderStatusItemProps) => {
  return (
    <Container className={statusClass(status)} mode={mode}>
      <Image
        src={mode === 'true' ? src : icon}
        width={30}
        height={30}
        alt={text}
      />
      <Status>{text}</Status>
      <Image
        src='/img/checked.png'
        width={20}
        height={20}
        alt='check icon'
        className='checkedIcon'
      />
    </Container>
  );
};

const Container = styled.div<IMode>`
  img:first-child {
    width: 3rem;
    height: 3rem;
    display: block;
    object-fit: cover;
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

export default OrderStatusItem;
