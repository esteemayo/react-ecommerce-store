import { useMemo } from 'react';
import styled from 'styled-components';

import { excerpts } from '../../utils';
import { formatCurrency } from '../../utils/formatCurrency';

import { TableBodyProps } from '../../types';

const TableBody = ({ _id: id, address, customer, total }: TableBodyProps) => {
  const addressLabel = useMemo(() => {
    return address?.length >= 50 ? excerpts(address, 50) : address;
  }, [address]);

  return (
    <Tbody>
      <Tr>
        <Td>
          <OrderId>{excerpts(id, 10)}</OrderId>
        </Td>
        <Td>
          <Span>{customer}</Span>
        </Td>
        <Td>
          <Span>{addressLabel}</Span>
        </Td>
        <Td>
          <Span>{formatCurrency(total)}</Span>
        </Td>
      </Tr>
    </Tbody>
  );
};

const Tbody = styled.tbody``;

const Tr = styled.tr``;

const Td = styled.td`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};

  &:first-child {
    @media only screen and (max-width: 64em) {
      display: none;
    }
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 2rem;
  }
`;

const OrderId = styled.span`
  display: inline-block;
  text-transform: uppercase;
`;

const Span = styled.span``;

export default TableBody;
