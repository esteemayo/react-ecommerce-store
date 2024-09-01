import styled from 'styled-components';

import { CommonImage } from '../CommonImage';

const EmptyOrder = () => {
  return (
    <Container>
      <Image src='/svg/no-data.svg' width={300} height={400} alt='no data' />
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
  height: 40rem;
  background-color: transparent;
  object-fit: contain;

  @media only screen and (max-width: 56.25em) {
    width: 60%;
  }

  @media only screen and (max-width: 31.25em) {
    width: 100%;
  }

  @media only screen and (min-width: 112.5em) {
    width: 40rem;
    height: 45rem;
  }
`;

const Message = styled.span`
  display: block;
  font-size: 3rem;
  color: ${({ theme }) => theme.text};

  @media only screen and (max-width: 37.5em) {
    font-size: 2.5rem;
  }
`;

export default EmptyOrder;
