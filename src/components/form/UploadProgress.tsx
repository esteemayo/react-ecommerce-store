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
  margin: ${({ type }) => !type && '2rem 0'};

  @media only screen and (min-width: 112.5em) {
    font-size: 1.8rem;
  }
`;

export default UploadProgress;
