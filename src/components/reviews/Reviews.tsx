'use client';

import styled from 'styled-components';
import { useCallback, useState } from 'react';

import ReviewHead from './ReviewHead';
import ReviewCards from './ReviewCards';

import { ReviewsProps } from '@/types';
import useReviewModal from '@/hooks/useReviewModal';

import ReviewModal from '../modals/ReviewModal';

const Reviews = ({
  reviews,
  rating,
  sortLabel,
  sort,
  onSort,
}: ReviewsProps) => {
  const { isOpen, onOpen, onClose } = useReviewModal();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleToggleFilter = useCallback(() => {
    setIsFilterOpen((value) => !value);
  }, []);

  const handleOpen = useCallback(() => {
    setIsFilterOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsFilterOpen(false);
  }, []);

  const handleCloseFilter = useCallback(() => {
    const reviewsEl = document.querySelector('.reviews');
    const filterEl = document.querySelector('.filter-container');

    reviewsEl.addEventListener('click', handleClose);
    filterEl.addEventListener('click', handleOpen);

    return () => {
      reviewsEl.removeEventListener('click', handleClose);
      filterEl.removeEventListener('click', handleOpen);
    };
  }, [handleClose, handleOpen]);

  return (
    <Container id='reviews' className='reviews' onClick={handleCloseFilter}>
      <Wrapper>
        <Heading>Reviews</Heading>
        <ReviewHead
          sort={sort}
          sortLabel={sortLabel}
          rating={rating}
          reviews={reviews}
          isOpen={isFilterOpen}
          onOpen={onOpen}
          onSort={onSort}
          onToggle={handleToggleFilter}
        />
        <ReviewCards rating={rating} reviews={reviews} onOpen={onOpen} />
      </Wrapper>
      <ReviewModal isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};

const Container = styled.section`
  width: 100vw;
  background-color: ${({ theme }) => theme.bgLight};
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  padding: 6rem 0;

  @media only screen and (max-width: 64em) {
    max-width: 100rem;
  }

  @media only screen and (max-width: 59.375em) {
    max-width: 80rem;
  }

  @media only screen and (max-width: 50em) {
    max-width: 70rem;
  }

  @media only screen and (max-width: 37.5em) {
    padding-left: 5rem;
    padding-right: 5rem;
  }

  @media only screen and (max-width: 26.875em) {
    padding-bottom: 3rem;
  }

  @media only screen and (max-width: 25em) {
    padding-left: 3rem;
    padding-right: 3rem;
  }
`;

const Heading = styled.h1`
  display: inline-block;
  width: 100%;
  text-transform: capitalize;
  font-weight: 500;
  font-size: 3.2rem;
  color: ${({ theme }) => theme.textProdHeader};
  line-height: 3.2rem;
`;

export default Reviews;
