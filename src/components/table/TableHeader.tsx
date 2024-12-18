import styled from 'styled-components';

import { ColumnType } from '../../types';

interface TableHeaderProps {
  columns: ColumnType;
}

const TableHeader = ({ columns }: TableHeaderProps) => {
  return (
    <Thead>
      <Tr>
        {columns.map((column) => {
          const { path, label } = column;
          return <Th key={path}>{label}</Th>;
        })}
      </Tr>
    </Thead>
  );
};

const Thead = styled.thead``;

const Tr = styled.tr``;

const Th = styled.th`
  font-weight: 700;
  font-size: 1.7rem;
  color: ${({ theme }) => theme.text};

  &:first-child {
    @media only screen and (max-width: 64em) {
      display: none;
    }
  }

  @media only screen and (max-width: 64em) {
    font-size: var(--default-font-size);
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 2.3rem;
  }
`;

export default TableHeader;
