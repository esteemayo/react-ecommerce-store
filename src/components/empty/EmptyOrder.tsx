import styled from 'styled-components';

import { CommonImage } from '../CommonImage';

const EmptyOrder = () => {
  return (
    <Container>
      <Image src='/svg/no-data.svg' width={500} height={500} alt='no data' />
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
  width: 35%;
  height: 35%;
  background-color: transparent;

  @media only screen and (max-width: 56.25em) {
    width: 60%;
  }

  @media only screen and (max-width: 31.25em) {
    width: 100%;
  }
`;

const Message = styled.span`
  display: block;
  font-size: 3rem;
  color: ${({ theme }) => theme.text};
  margin-top: 5rem;

  @media only screen and (max-width: 37.5em) {
    font-size: 2.5rem;
  }
`;

export default EmptyOrder;
