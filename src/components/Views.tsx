import styled from 'styled-components';
import millify from 'millify';
import { FiEye } from 'react-icons/fi';

interface ViewsProps {
  totalViews: number;
}

const Views = ({ totalViews }: ViewsProps) => {
  return (
    <Container>
      <FiEye />
      <Span>{millify(totalViews)} views in the last 7 days</Span>
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
