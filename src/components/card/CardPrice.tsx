import styled from 'styled-components';

import { CardPriceProps } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';

const CardPrice = ({ inStock, initialPrice, priceLabel }: CardPriceProps) => {
  return (
    <Container>
      <Wrapper>
        <Discount>{formatCurrency(initialPrice)}</Discount>
        <Price>{formatCurrency(priceLabel)}</Price>
      </Wrapper>
      {inStock && <InStock>In stock</InStock>}
    </Container>
  );
};

const Container = styled.div`
  margin: 0.5rem 0 1.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Price = styled.span`
  font-weight: 600;
  font-size: 1.85rem;
  color: ${({ theme }) => theme.textPrice};
  line-height: 1;

  @media only screen and (max-width: 35em) {
    font-size: 1.7rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 2.25rem;
  }
`;

const Discount = styled.span`
  text-decoration: line-through;
  font-size: 1.7rem;
  color: ${({ theme }) => theme.textDiscount};

  @media only screen and (max-width: 35em) {
    font-size: 1.58rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 2rem;
  }
`;

const InStock = styled.div`
  color: var(--clr-green-light);
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 2px;

  @media only screen and (max-width: 35em) {
    font-size: 1.43rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 1.8rem;
    gap: 0.5rem;
  }

  &::before {
    content: '';
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background-color: var(--clr-green-light);
    border-radius: 50%;

    @media only screen and (max-width: 35em) {
      width: 0.85rem;
      height: 0.85rem;
    }

    @media only screen and (min-width: 112.5em) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

export default CardPrice;
