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
  margin-top: 1rem;
`;

const Span = styled.span``;

export default Views;
