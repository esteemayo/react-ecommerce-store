'use client';

import styled from 'styled-components';

import StarRating from '../StarRating';

interface RatingInfoProps {
  rating: number;
}

const RatingInfo = ({ rating }: RatingInfoProps) => {
  return (
    <Container>
      <StarRating readOnly value={rating} name='read-only' />
      <Count>Based on 61 reviews</Count>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    font-size: 2rem;
    color: ${({ theme }) => theme.star};
    margin-right: 0.5rem;

    @media only screen and (max-width: 18.75em) {
      font-size: 1.87rem;
      margin-right: 3px;
    }
  }
`;

const Count = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textRevCount};
  letter-spacing: 0.5px;
`;

export default RatingInfo;
