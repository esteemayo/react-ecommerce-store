import Table from '../table/Table';
import { OrderTableProps } from '../../types';

const OrderTable = ({ order }: OrderTableProps) => {
  const columns = [
    {
      path: '_id',
      label: 'Order ID',
    },
    {
      path: 'customer',
      label: 'Customer',
    },
    {
      path: 'address',
      label: 'Address',
    },
    {
      path: 'total',
      label: 'Total',
    },
  ];

  return <Table columns={columns} data={order} />;
};

export default OrderTable;
