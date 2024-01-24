import styled from 'styled-components';

import { TableHeaderProps } from '../../types';

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
  font-weight: 600;
  font-size: 1.7rem;
  color: ${({ theme }) => theme.text};

  @media only screen and (max-width: 64em) {
    font-size: var(--default-font-size);
  }
`;

export default TableHeader;
