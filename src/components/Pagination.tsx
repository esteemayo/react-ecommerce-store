import { Link } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components';

import { PaginationProps } from '../types';

interface IBtn {
  isActive: string;
}

const Pagination = ({
  url,
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
              to={`${url}?page=${page}`}
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
  width: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 120rem;
  padding-bottom: 7rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media only screen and (min-width: 112.5em) {
    max-width: 140rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &:not(:last-child) {
    margin-right: 1rem;

    @media only screen and (min-width: 112.5em) {
      margin-right: 1.5rem;
    }
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
  background-color: ${({ isActive, theme }) => setBcg(isActive, theme)};
  color: ${({ isActive, theme }) => setColor(isActive, theme)};
  box-shadow: inset ${({ theme }) => theme.boxPage};
  -webkit-box-shadow: inset ${({ theme }) => theme.boxPage};
  -moz-box-shadow: inset ${({ theme }) => theme.boxPage};
  border-radius: 50%;
  outline-color: #ccc;
  cursor: pointer;
  transition: all 0.3s;

  @media only screen and (max-width: 68.75em) {
    font-size: 1.7rem;
    width: 4rem;
    height: 4rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 2rem;
    width: 5rem;
    height: 5rem;
    padding: 1rem;
  }

  &:hover {
    font-weight: 600;
    font-size: var(--default-font-size);
    transform: scale(1.03);

    @media only screen and (max-width: 68.75em) {
      font-size: 1.8rem;
    }

    @media only screen and (min-width: 112.5em) {
      font-size: 2.1rem;
    }
  }

  &:disabled {
    opacity: 0.85;
    cursor: default;
  }
`;

const setBcg = (isActive: string, theme: DefaultTheme) => {
  return isActive === 'true' ? theme.bgNav : 'transparent';
};

const setColor = (isActive: string, theme: DefaultTheme) => {
  return isActive === 'true' ? 'var(--clr-white)' : theme.textScroll;
};

export default Pagination;
