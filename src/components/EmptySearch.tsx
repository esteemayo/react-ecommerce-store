import styled from 'styled-components';

import { CommonImage } from './CommonImage';

const EmptySearch = () => {
  return (
    <Container>
      <Wrapper>
        <StyledImage src='/img/no-result.png' width={500} height={250} alt='' />
        <Message>No result matches your search criteria</Message>
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 3rem;
`;

const StyledImage = styled(CommonImage)`
  width: 50rem;
  height: 25rem;
  background-color: transparent;

  @media only screen and (max-width: 25em) {
    width: 40rem;
  }

  @media only screen and (max-width: 18.75em) {
    width: 34.5rem;
  }
`;

const Message = styled.span`
  font-size: 2rem;
  color: ${({ theme }) => theme.textNotFound};
`;

export default EmptySearch;
