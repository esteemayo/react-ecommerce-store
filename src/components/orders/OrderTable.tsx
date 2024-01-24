import styled from 'styled-components';

import { OrderTableProps } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';

const OrderTable = ({ _id: id, customer, address, total }: OrderTableProps) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Order ID</Th>
          <Th>Customer</Th>
          <Th>Address</Th>
          <Th>Total</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>
            <OrderId>{id}</OrderId>
          </Td>
          <Td>
            <OrderName>{customer}</OrderName>
          </Td>
          <Td>
            <OrderAddress>{address}</OrderAddress>
          </Td>
          <Td>
            <OrderTotal>{formatCurrency(total)}</OrderTotal>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

const Table = styled.table`
  width: 100%;
  text-align: left;
  margin-bottom: 5rem;
`;

const Thead = styled.thead``;

const Tr = styled.tr``;

const Th = styled.th`
  font-weight: 600;
  font-size: 1.7rem;
  color: ${({ theme }) => theme.text};

  @media only screen and (max-width: 64em) {
    font-size: var(--default-font-size);
  }
`;

const Tbody = styled.tbody``;

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

export default OrderTable;
