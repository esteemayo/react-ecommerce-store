import styled from 'styled-components';
import { FiEye } from 'react-icons/fi';

const Views = () => {
  return (
    <Container>
      <FiEye />
      <Span>248 views in the last 7 days</Span>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.textLabel};
  margin-top: 1rem;

  svg {
    font-size: 2rem;
    color: currentColor;
  }
`;

const Span = styled.span``;

export default Views;
