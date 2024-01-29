import styled from 'styled-components';
import { useMemo } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';

import { excerpts } from '../../utils';
import { formatCurrency } from '../../utils/formatCurrency';

import { DateOptions, OrderCardProps } from '../../types';

interface IContainer {
  status: number;
}

const OrderCard = ({ _id: id, total, status, createdAt }: OrderCardProps) => {
  const dateLabel = useMemo(() => {
    const options: DateOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };

    const date = new Date(createdAt).toLocaleDateString('en-us', options);
    return date;
  }, [createdAt]);

  const url = useMemo(() => {
    return `/orders/${encodeURIComponent(id)}`;
  }, [id]);

  return (
    <Container status={status}>
      <Order>
        <OrderDateIconContainer>
          <OrderDateWrapper>
            <OrderId>Order id: {excerpts(id, 15)}</OrderId>
            <OrderDate dateTime={createdAt}>Placed on {dateLabel}</OrderDate>
          </OrderDateWrapper>
          <OrderIconWrapper>
            <MoreVertIcon />
          </OrderIconWrapper>
        </OrderDateIconContainer>
        <OrderTotal>Total: {formatCurrency(total)}</OrderTotal>
        <StyledLink to={url}>
          <Button type='button'>Order details</Button>
        </StyledLink>
      </Order>
    </Container>
  );
};

const Container = styled.article<IContainer>`
  width: 30%;
  background-color: ${({ theme }) => theme.bgOrderCard};
  border-top-left-radius: ${({ status }) => setRadius(status)};
  border-top-right-radius: ${({ status }) => setRadius(status)};
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  box-shadow: ${({ theme }) => theme.boxCat};
  -webkit-box-shadow: ${({ theme }) => theme.boxCat};
  -moz-box-shadow: ${({ theme }) => theme.boxCat};

  @media only screen and (max-width: 43.75em) {
    width: 45%;
  }

  @media only screen and (max-width: 37.5em) {
    width: 100%;
  }

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 3px;
    margin: 0 auto;
    background-color: ${({ status }) => setBcg(status)};
  }
`;

const OrderDateIconContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const OrderDateWrapper = styled.div``;

const OrderIconWrapper = styled.div`
  svg {
    font-size: 1.8rem;
    fill: ${({ theme }) => theme.textRevPlace};

    @media only screen and (max-width: 37.5em) {
      font-size: 2.3rem;
    }
  }
`;

const Order = styled.div`
  padding: 2rem;
`;

const OrderId = styled.h2`
  display: inline-block;
  font-weight: 400;
  font-size: 2rem;
  color: ${({ theme }) => theme.text};

  @media only screen and (max-width: 64em) {
    font-size: 1.8rem;
  }

  @media only screen and (max-width: 37.5em) {
    font-size: 2.3rem;
  }
`;

const OrderDate = styled.time`
  display: block;
  font-size: 1.45rem;
  color: ${({ theme }) => theme.textSearchInput};

  @media only screen and (max-width: 64em) {
    font-size: 1.3rem;
  }

  @media only screen and (max-width: 37.5em) {
    font-size: 1.5rem;
  }
`;

const OrderTotal = styled.p`
  font-weight: 500;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.text};
  margin: 1rem 0 0.5rem;

  @media only screen and (max-width: 64em) {
    font-size: 2rem;
  }

  @media only screen and (max-width: 37.5em) {
    font-size: 2.43rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.textSearchInput};
  outline: none;

  &:active {
    color: currentColor;
  }
`;

const Button = styled.button`
  display: inline-block;
  text-transform: capitalize;
  font-size: 1.3rem;
  padding: 1rem 2rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textSearchInput};
  border: 1px solid ${({ theme }) => theme.textOrderBtn};
  border-radius: 0.5rem;
  outline-color: ${({ theme }) => theme.inputOut};
  cursor: pointer;

  @media only screen and (max-width: 64em) {
    padding: 0.7rem 1.5rem;
  }

  @media only screen and (max-width: 37.5em) {
    font-size: 1.5rem;
    padding: 1rem 2.5rem;
  }
`;

const setRadius = (status: number) => {
  if (status < 3) return 0;
  return '1rem';
};

const setBcg = (status: number) => {
  if (status === 0) return 'var(--clr-primary-red)';
  if (status === 1) return 'var(--clr-yellow)';
  if (status === 2) return 'var(--clr-primary-green)';
};

export default OrderCard;
