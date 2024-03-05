import styled from 'styled-components';
import millify from 'millify';
import { FiEye } from 'react-icons/fi';
import { useMemo } from 'react';

interface ViewsProps {
  totalViews: number;
}

const Views = ({ totalViews }: ViewsProps) => {
  const viewLabel = useMemo(() => {
    return totalViews === 1 ? 'view' : 'views';
  }, [totalViews]);

  return (
    <Container>
      <FiEye />
      <Span>
        {millify(totalViews)} {viewLabel} in the last 7 days
      </Span>
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
