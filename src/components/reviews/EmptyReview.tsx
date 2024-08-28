import styled from 'styled-components';

import StarRating from '../StarRating';
import ReviewButton from './ReviewButton';

import { EmptyReviewProps } from '../../types';

const EmptyReview = ({
  title = 'Currently, there are no reviews for this product.',
  label = 'Leave a review',
  ratingsAverage,
  onClick,
}: EmptyReviewProps) => {
  return (
    <Container>
      <StarRating readOnly value={ratingsAverage} name='read-only' />
      <Message>{title}</Message>
      <ReviewButton actionLabel={label} onAction={onClick} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.3rem;

  svg {
    font-size: 2.5rem;
    fill: ${({ theme }) => theme.star};
    margin-right: 0.5rem;

    @media only screen and (max-width: 26.875em) {
      font-size: 2.25rem;
    }

    @media only screen and (max-width: 18.75em) {
      font-size: 2rem;
    }

    @media only screen and (min-width: 112.5em) {
      font-size: 2.8rem;
    }
  }
`;

const Message = styled.span`
  font-size: 100%;
  color: ${({ theme }) => theme.text};

  @media only screen and (max-width: 18.75em) {
    font-size: 1.5rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 1.8rem;
  }
`;

export default EmptyReview;
