import styled, { css } from 'styled-components';

import { formatCurrency } from '../../utils/formatCurrency';

interface OrderInfoProps {
  total: number;
}

const OrderInfo = ({ total }: OrderInfoProps) => {
  return (
    <Container>
      <Wrapper>
        <Heading>Cart total</Heading>
        <TotalContainer>
          <TotalText>Subtotal:</TotalText>
          <Price>{formatCurrency(total)}</Price>
        </TotalContainer>
        <TotalContainer>
          <TotalText>Discount:</TotalText>
          <Price>{formatCurrency(0.0)}</Price>
        </TotalContainer>
        <TotalContainer>
          <TotalText>Total ($):</TotalText>
          <Price>{formatCurrency(total)}</Price>
        </TotalContainer>
        <Button type='button' disabled>
          Paid
        </Button>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;

  @media only screen and (max-width: 37.5em) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  width: 90%;
  max-height: 30rem;
  background-color: ${({ theme }) => theme.bgOrderTotal};
  color: ${({ theme }) => theme.textOrderTotal};
  padding: 5rem;
  padding-top: 1rem;
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.boxOrderTotal};
  -webkit-box-shadow: ${({ theme }) => theme.boxOrderTotal};
  -moz-box-shadow: ${({ theme }) => theme.boxOrderTotal};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (max-width: 64em) {
    width: 100%;
    padding-left: 3rem;
    padding-container: 3rem;
  }
`;

const Heading = styled.h2`
  display: inline-block;
  text-transform: capitalize;
  font-weight: 500;

  @media only screen and (min-width: 112.5em) {
    font-size: 3rem;
  }
`;

const TotalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  line-height: 1.3;

  @media only screen and (max-width: 64em) {
    line-height: 1.4;
  }

  @media only screen and (max-width: 37.5em) {
    align-items: baseline;
  }

  &:last-of-type {
    margin-bottom: 2rem;
  }
`;

const TotalText = styled.b`
  display: inline-block;
  text-transform: capitalize;

  @media only screen and (max-width: 37.5em) {
    font-size: 1.7rem;
    letter-spacing: 3px;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 2.1rem;
  }
`;

const Price = styled.span``;

const Button = styled.button`
  display: inline-block;
  border: none;
  text-transform: capitalize;
  font-weight: 600;
  font-size: 1.5rem;
  padding: 1.35rem 3rem;
  background-color: ${({ theme }) => theme.bgPay};
  color: ${({ theme }) => theme.textBtn};
  background-image: ${({ theme }) => css`
  linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    ${theme.bgPayBtn} 50%
  );
  `};
  background-size: 220%;
  border-radius: 0.5rem;
  outline-color: #222;
  cursor: pointer;
  transition: all 0.3s;

  @media only screen and (max-width: 64em) {
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
  }

  @media only screen and (max-width: 37.5em), only screen and (hover: none) {
    font-size: 1.55rem;
  }

  &:hover {
    background-position: 100%;
  }

  &:disabled {
    cursor: default;
  }
`;

export default OrderInfo;
