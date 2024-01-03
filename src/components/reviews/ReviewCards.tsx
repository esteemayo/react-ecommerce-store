'use client';

import styled from 'styled-components';

import ReviewCard from './ReviewCard';
import EmptyReview from './EmptyReview';

import { ReviewCardsProps } from '@/types';

const ReviewCards = ({ rating, reviews, onOpen }: ReviewCardsProps) => {
  if (reviews.length === 0) {
    return (
      <Container>
        <EmptyReview rating={rating} onClick={onOpen} />
      </Container>
    );
  }

  return (
    <Container>
      <Wrapper>
        {reviews.slice(0, 3).map((item) => {
          return <ReviewCard key={item.id} {...item} />;
        })}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 5rem 0 0.5rem 0;
  border-top: 1px solid ${({ theme }) => theme.cartBorder};
  position: relative;

  @media only screen and (max-width: 26.875em) {
    padding-top: 3rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
`;

export default ReviewCards;
