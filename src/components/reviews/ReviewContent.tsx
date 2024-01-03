'use client';

import styled from 'styled-components';

import RatingInfo from './RatingInfo';
import ReviewInfo from './ReviewInfo';
import ReviewLink from './ReviewLink';

import { ReviewContentProps } from '@/types';

const ReviewContent = ({ rating, review, reviewer }: ReviewContentProps) => {
  return (
    <Container>
      <RatingInfo rating={rating} />
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
  height: 100%;
  padding: 8rem 0 10rem 4rem;
  background-color: ${({ theme }) => theme.bgRevs};

  @media only screen and (max-width: 64em) {
    padding-container: 3rem;
  }

  @media only screen and (max-width: 50em) {
    padding-top: 5rem;
    gap: 3rem;
  }
`;

export default ReviewContent;
