import styled from 'styled-components';

const ErrorState = () => {
  return <Container>ErrorState</Container>;
};

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
`;

export default ErrorState;
