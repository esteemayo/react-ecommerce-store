import styled from 'styled-components';

import TableBody from './TableBody';
import TableHeader from './TableHeader';

import { TableProps } from '../../types';

const Table = ({ columns, data }: TableProps) => {
  return (
    <StyledTable>
      <TableHeader columns={columns} />
      <TableBody data={data} />
    </StyledTable>
  );
};

const StyledTable = styled.table`
  width: 100%;
  text-align: left;
  margin-bottom: 5rem;
`;

export default Table;
