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
  padding: 3rem 0;

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
  display: inline-block;
  font-weight: 500;
  font-size: 100%;
  width: 4rem;
  height: 4rem;
  padding: 0.5rem;
`;

export default Pagination;
