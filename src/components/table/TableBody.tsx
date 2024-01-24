import styled from 'styled-components';

import { TableBodyProps } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';

const TableBody = ({ _id: id, address, customer, total }: TableBodyProps) => {
  return (
    <Tbody>
      <Tr>
        <Td>
          <OrderId>{id}</OrderId>
        </Td>
        <Td>
          <Span>{customer}</Span>
        </Td>
        <Td>
          <Span>{address}</Span>
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
`;

const OrderId = styled.span`
  display: inline-block;
  text-transform: uppercase;
`;

const Span = styled.span``;

export default TableBody;
