import styled from 'styled-components';

import { OrderType } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';

interface TableBodyProps {
  data: OrderType;
}

const TableBody = ({ data }: TableBodyProps) => {
  return (
    <Tbody>
      <Tr>
        <Td>
          <OrderId>{data._id}</OrderId>
        </Td>
        <Td>
          <OrderName>{data.customer}</OrderName>
        </Td>
        <Td>
          <OrderAddress>{data.address}</OrderAddress>
        </Td>
        <Td>
          <OrderTotal>{formatCurrency(data.total)}</OrderTotal>
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

const OrderName = styled.span``;

const OrderAddress = styled.span``;

const OrderTotal = styled.span``;

export default TableBody;
