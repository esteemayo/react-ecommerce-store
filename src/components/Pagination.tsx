import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const StyledLink = styled(Link)``;

const Button = styled.button``;

export default Pagination;
