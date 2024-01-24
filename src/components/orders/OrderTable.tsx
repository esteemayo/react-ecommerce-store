import Table from '../table/Table';

import { orderColumns } from '../../data';
import { OrderTableProps } from '../../types';

const OrderTable = ({ order }: OrderTableProps) => {
  return <Table columns={orderColumns} data={order} />;
};

export default OrderTable;
