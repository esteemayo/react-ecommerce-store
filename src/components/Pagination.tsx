import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCallback, useMemo } from 'react';

import { PaginationProps } from '../types';

const Pagination = ({ counts, page, numberOfPages }: PaginationProps) => {
  const nextPage = useMemo(() => {
    return `/products?page=${page! + 1}`;
  }, [page]);

  const prevPage = useMemo(() => {
    return `/products?page=${page! - 1}`;
  }, [page]);

  const renderPagination = useCallback(() => {
    if (page === 1 && page === numberOfPages) return null;

    if (page === 1) {
      return (
        <>
          <Button type='button'>&nbsp;</Button>
          <CurrentPage>{page!}</CurrentPage>
          <StyledLink to={nextPage}>
            <Button type='button'>Next</Button>
          </StyledLink>
        </>
      );
    } else if (page !== numberOfPages) {
      return (
        <>
          <StyledLink to={prevPage}>
            <Button type='button'>Prev</Button>
          </StyledLink>
          <CurrentPage>{page!}</CurrentPage>
          <StyledLink to={nextPage}>
            <Button type='button'>Next</Button>
          </StyledLink>
        </>
      );
    } else {
      return (
        <>
          <StyledLink to={prevPage}>
            <Button type='button'>Prev</Button>
          </StyledLink>
          <CurrentPage>{page!}</CurrentPage>
          <Button type='button'>&nbsp;</Button>
        </>
      );
    }
  }, [nextPage, numberOfPages, page, prevPage]);

  return (
    <Container>
      <Wrapper>
        <ButtonContainer>{renderPagination()}</ButtonContainer>
      </Wrapper>
      <TotalItems>- {counts} items -</TotalItems>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  padding: 5rem 0 10rem;

  @media only screen and (max-width: 37.5em) {
    padding-bottom: 5rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 2rem 3rem;
  background-color: ${({ theme }) => theme.bgPagination};
  color: inherit;
  box-shadow: ${({ theme }) => theme.boxPagination};
  -webkit-box-shadow: ${({ theme }) => theme.boxPagination};
  -moz-box-shadow: ${({ theme }) => theme.boxPagination};
  border-radius: 0.5rem;

  @media only screen and (max-width: 37.5em) {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CurrentPage = styled.span`
  width: 3.5rem;
  height: 3.5rem;
  text-align: center;
  font-weight: 600;
  font-size: 2rem;
  color: ${({ theme }) => theme.textPagination};
  border: 1px solid ${({ theme }) => theme.textPagination};
  border-radius: 50%;

  @media only screen and (max-width: 37.5em) {
    width: 3.25rem;
    height: 3.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border: none;
  display: inline-block;
  text-transform: capitalize;
  font-size: 1.5rem;
  background-color: transparent;
  color: inherit;
  outline-color: #ccc;
  outline-offset: 3px;
  cursor: pointer;
`;

const TotalItems = styled.p`
  display: block;
  text-align: center;
  text-transform: lowercase;
  padding-top: 2rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.textCartItem};
`;

export default Pagination;
