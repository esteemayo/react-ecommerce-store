import styled from 'styled-components';

import RatingInfo from './RatingInfo';
import ReviewInfo from './ReviewInfo';
import ReviewLink from './ReviewLink';

import { ReviewContentProps } from '../../types';

const ReviewContent = ({
  rating,
  review,
  reviewer,
  totalReviews,
}: ReviewContentProps) => {
  return (
    <Container>
      <RatingInfo rating={rating} totalReviews={totalReviews} />
      <ReviewInfo review={review} reviewer={reviewer} />
      <ReviewLink />
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  width: 100%;
  max-width: 35rem;
  height: 100%;
  padding: 8rem 0 0 4rem;
  background-color: ${({ theme }) => theme.bgRevs};

  @media only screen and (max-width: 64em) {
    padding-container: 3rem;
  }

  @media only screen and (max-width: 50em) {
    padding-top: 5rem;
    gap: 3rem;
  }

  @media only screen and (min-width: 112.5em) {
    padding: 8rem 0 0 2rem;
  }
`;

export default ReviewContent;
