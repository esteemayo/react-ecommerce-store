import styled from 'styled-components';

import CheckedIcon from '../icons/CheckedIcon';
import { OrderStatusItemProps } from '../../types';

const OrderStatusItem = ({
  icon,
  src,
  text,
  status,
  statusClass,
  mode,
}: OrderStatusItemProps) => {
  return (
    <Container className={statusClass(status)}>
      <Image
        src={mode === 'true' ? src : icon}
        width={30}
        height={30}
        alt={text}
      />
      <Status>{text}</Status>
      <CheckedIcon />
    </Container>
  );
};

const Container = styled.div`
  img:first-child {
    width: 3rem;
    height: 3rem;
    display: block;
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
