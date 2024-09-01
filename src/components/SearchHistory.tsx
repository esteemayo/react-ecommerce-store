import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faClock, faTimes } from '@fortawesome/free-solid-svg-icons';

import { SearchHistoryProps } from '../types';

const SearchHistory = ({
  id,
  query,
  onClose,
  onDelete,
}: SearchHistoryProps) => {
  const url = useMemo(() => {
    return `/search?q=${query}`;
  }, [query]);

  return (
    <Container key={id}>
      <IconWrapper>
        <FontAwesomeIcon icon={faClock} />
      </IconWrapper>
      <History>
        <StyledLink to={url} onClick={onClose}>
          {query}
        </StyledLink>
      </History>
      <Remove onClick={() => onDelete(id)}>
        <FontAwesomeIcon icon={faTimes} />
      </Remove>
    </Container>
  );
};

const Container = styled.article`
  display: flex;
  align-items: center;
  gap: 3rem;
  color: ${({ theme }) => theme.textProdCard};
  position: relative;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const IconWrapper = styled.div`
  svg {
    font-size: 1.75rem;
    color: inherit;

    @media only screen and (min-width: 112.5em) {
      font-size: 2.5rem;
    }
  }
`;

const History = styled.div``;

const StyledLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  font-size: 100%;
  color: currentColor;

  @media only screen and (min-width: 112.5em) {
    font-size: 2.3rem;
  }
`;

const Remove = styled.button`
  display: inline-block;
  border: none;
  font-size: 1.75rem;
  background-color: transparent;
  color: currentColor;
  outline-offset: 2px;
  cursor: pointer;

  position: absolute;
  right: 0;

  svg {
    font-size: inherit;
    color: inherit;
  }
`;

export default SearchHistory;
