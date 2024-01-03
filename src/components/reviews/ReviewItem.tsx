'use client';

import styled from 'styled-components';
import { useMemo } from 'react';

import ReviewImage from './ReviewImage';
import ReviewContent from './ReviewContent';

import { ReviewItemProps } from '@/types';

const ReviewItem = ({ user, rating, review }: ReviewItemProps) => {
  const reviewer = useMemo(() => {
    const name = user.name.split(' ');

    return `
      ${name.shift()} 
      ${name.pop().charAt(0)}.
    `;
  }, [user]);

  return (
    <Container>
      <Wrapper>
        <ReviewContent rating={rating} review={review} reviewer={reviewer} />
        <ReviewImage photo={user.photo} />
      </Wrapper>
    </Container>
  );
};

const Container = styled.article`
  background-color: ${({ theme }) => theme.bgRev};
  width: 700px;
  height: 50rem;
  max-height: 50rem;
  margin-right: 30px;

  @media only screen and (max-width: 64em) {
    height: 45rem;
    max-height: 45rem;
  }

  @media only screen and (max-width: 50em) {
    height: 40rem;
    max-height: 40rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default ReviewItem;
