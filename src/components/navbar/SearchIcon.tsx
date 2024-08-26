import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { SearchIconProps } from '../../types';

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
  outline-color: ${({ theme }) => theme.navOut};
  cursor: pointer;

  @media only screen and (min-width: 112.5em) {
    font-size: 2.25rem;
  }

  svg {
    font-size: inherit;
    color: currentColor;
  }
`;

export default SearchIcon;
