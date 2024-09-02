import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Pagination = () => {
  const pagesCount = 7;
  const pages = Array.from(new Array(pagesCount), (_, index) => index + 1);

  return (
    <Container>
      <Wrapper>
        {pages.map((page) => {
          return (
            <StyledLink key={page} to='#'>
              <Button type='button'>{page}</Button>
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

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 500;
  font-size: 1.4rem;
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  background-color: transparent;
  color: ${({ theme }) => theme.bgNav};
  border: 1px solid currentColor;
  border-radius: 50%;
  cursor: pointer;
`;

export default Pagination;
