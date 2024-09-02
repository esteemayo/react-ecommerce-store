import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { PaginationProps } from '../types';

interface IBtn {
  isActive: string;
}

const Pagination = ({
  category,
  currentPage,
  totalPages,
  onAction,
}: PaginationProps) => {
  const pages = Array.from(new Array(totalPages), (_, index) => index + 1);

  return (
    <Container>
      <Wrapper>
        {pages.map((page) => {
          return (
            <StyledLink
              key={page}
              to={`/products/category/${category}?page=${page}`}
              onClick={() => onAction(page)}
            >
              <Button
                type='button'
                disabled={currentPage === page}
                isActive={String(currentPage === page)}
              >
                {page}
              </Button>
            </StyledLink>
          );
        })}
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  width: 100vw;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 120rem;
  padding-bottom: 7rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const Button = styled.button<IBtn>`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  font-weight: 500;
  font-size: 1.5rem;
  width: 3.5rem;
  height: 3.5rem;
  padding: 0.5rem;
  background-color: ${({ isActive, theme }) =>
    isActive === 'true' ? theme.bgNav : 'transparent'};
  color: ${({ theme }) => theme.textScroll};
  box-shadow: inset ${({ theme }) => theme.boxPage};
  -webkit-box-shadow: inset ${({ theme }) => theme.boxPage};
  -moz-box-shadow: inset ${({ theme }) => theme.boxPage};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    font-weight: 600;
    font-size: var(--default-font-size);
    transform: scale(1.03);
  }

  &:disabled {
    opacity: 0.85;
    cursor: default;
  }
`;

export default Pagination;
