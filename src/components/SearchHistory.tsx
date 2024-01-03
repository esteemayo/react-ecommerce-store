'use client';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { faClock, faTimes } from '@fortawesome/free-solid-svg-icons';

import { SearchHistoryProps } from '@/types';

const SearchHistory = ({ id, query, onDelete }: SearchHistoryProps) => {
  return (
    <Container key={id}>
      <IconWRapper>
        <FontAwesomeIcon icon={faClock} />
      </IconWRapper>
      <History>
        <StyledLink href='#' passHref>
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

const IconWRapper = styled.div`
  svg {
    font-size: 1.75rem;
    color: inherit;
  }
`;

const History = styled.div``;

const StyledLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: currentColor;
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
