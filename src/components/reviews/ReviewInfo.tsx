import styled from 'styled-components';

import { excerpts } from '../../utils';
import { ReviewInfoProps } from '../../types';

const ReviewInfo = ({ review, reviewer }: ReviewInfoProps) => {
  return (
    <Container>
      <Review>{excerpts(review, 100)}</Review>
      <Reviewer>{reviewer}</Reviewer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Review = styled.p`
  width: 70%;
  font-weight: 600;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.textRev};

  @media only screen and (max-width: 18.75em) {
    width: 60%;
    font-size: 1.65rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 2rem;
  }
`;

const Reviewer = styled.span`
  display: inline-block;
  font-weight: 300;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.textReviewer};

  @media only screen and (min-width: 112.5em) {
    font-size: 1.8rem;
  }
`;

export default ReviewInfo;
