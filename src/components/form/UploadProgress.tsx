import { useMemo } from 'react';
import styled from 'styled-components';

interface UploadProgressProps {
  type?: boolean;
  percentage: number;
}

interface ISpan {
  type?: boolean;
}

const UploadProgress = ({ type, percentage }: UploadProgressProps) => {
  const progressLabel = useMemo(() => {
    return percentage === 100 ? 'Uploaded:' : 'Uploading:';
  }, [percentage]);

  return (
    <Container type={type}>
      {progressLabel} {percentage}%
    </Container>
  );
};

const Container = styled.span<ISpan>`
  display: inline-block;
  text-transform: capitalize;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.text};
  margin-top: ${({ type }) => !type && '2rem'};
`;

export default UploadProgress;
