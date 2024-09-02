import styled from 'styled-components';

const Pagination = () => {
  return (
    <Container>
      <Wrapper>Pagination</Wrapper>
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
`;

export default Pagination;
