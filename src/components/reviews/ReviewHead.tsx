import { useMemo } from 'react';
import styled from 'styled-components';

import ReviewButton from './ReviewButton';
import StarRating from '../StarRating';
import ReviewFilter from './ReviewFilter';

import { ReviewHeadProps } from '../../types';

const ReviewHead = ({
  sort,
  sortLabel,
  ratingsAverage,
  reviews,
  isOpen,
  onOpen,
  onSort,
  onToggle,
}: ReviewHeadProps) => {
  const avgRatings = useMemo(() => {
    if (ratingsAverage === 0) {
      return 0;
    } else if (ratingsAverage.toString().length > 3) {
      return ratingsAverage.toFixed(2);
    } else {
      return ratingsAverage.toFixed(1);
    }
  }, [ratingsAverage]);

  const reviewLabel = useMemo(() => {
    return reviews?.length < 1 || reviews?.length > 1 ? 'reviews' : 'review';
  }, [reviews]);

  return (
    <Container>
      <Ratings>
        <AverageRatings>{avgRatings}</AverageRatings>
        <StarRating readOnly value={ratingsAverage} name='read-only' />
        <TotalReviews>
          {reviews?.length} {reviewLabel}
        </TotalReviews>
      </Ratings>
      <Wrapper>
        {reviews?.length > 0 && (
          <ReviewButtonWrapper>
            <ReviewButton actionLabel='Leave a review' onAction={onOpen} />
          </ReviewButtonWrapper>
        )}
        <ReviewFilter
          sort={sort}
          value={sortLabel}
          isOpen={isOpen}
          onClick={onToggle}
          onSort={onSort}
        />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 3rem 0 0.5rem 0;
  display: flex;
  flex-direction: column;

  svg {
    font-size: 3rem;
    color: ${({ theme }) => theme.star};

    @media only screen and (max-width: 26.875em) {
      font-size: 2.65rem;
    }

    @media only screen and (max-width: 18.75em) {
      font-size: 2.45rem;
    }
  }
`;

const Ratings = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;

  @media only screen and (max-width: 26.875em) {
    margin-bottom: 2rem;
  }
`;

const AverageRatings = styled.span`
  display: inline-block;
  font-weight: 500;
  font-size: 3.2rem;
  color: ${({ theme }) => theme.text};
  line-height: 3.2rem;

  @media only screen and (max-width: 26.875em) {
    font-size: 3rem;
  }

  @media only screen and (max-width: 18.75em) {
    font-size: 2.8rem;
  }
`;

const TotalReviews = styled.span`
  display: inline-block;
  font-weight: normal;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.8rem;

  @media only screen and (max-width: 26.875em) {
    font-size: var(--default-font-size);
  }

  @media only screen and (max-width: 18.75em) {
    font-size: 1.4rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 3rem;

  @media only screen and (max-width: 20.75em) {
    flex-direction: column;
    align-items: flex-end;
    gap: 0;
  }
`;

const ReviewButtonWrapper = styled.div``;

export default ReviewHead;
