import styled from 'styled-components';

import { CommonImage } from '../CommonImage';

const EmptyOrder = () => {
  return (
    <Container>
      <Image src='/img/empty-list.png' width={500} height={500} alt='' />
      <Message>No orders found</Message>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled(CommonImage)`
  width: 30rem;
  height: 30rem;
  background-color: transparent;
`;

const Message = styled.span`
  display: block;
  font-size: 3rem;
  color: ${({ theme }) => theme.text};
  margin-top: -5rem;

  @media only screen and (max-width: 37.5em) {
    font-size: 2.5rem;
  }
`;

export default EmptyOrder;
