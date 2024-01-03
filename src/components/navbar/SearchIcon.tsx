'use client';

import styled from 'styled-components';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SearchIconProps } from '@/types';

const SearchIcon = ({ onOpen }: SearchIconProps) => {
  return (
    <Container onClick={onOpen}>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </Container>
  );
};

const Container = styled.button`
  display: inline-block;
  border: none;
  font-size: 2rem;
  background-color: transparent;
  color: ${({ theme }) => theme.bgToggleModeIcon};
  outline-color: var(--clr-primary-green);
  cursor: pointer;

  svg {
    font-size: inherit;
    color: currentColor;
  }
`;

export default SearchIcon;
