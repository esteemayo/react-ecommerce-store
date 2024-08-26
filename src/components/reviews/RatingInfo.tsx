import styled from 'styled-components';

import StarRating from '../StarRating';

interface RatingInfoProps {
  rating: number;
  totalReviews: number;
}

const RatingInfo = ({ rating, totalReviews }: RatingInfoProps) => {
  return (
    <Container>
      <StarRating readOnly value={rating} name='read-only' />
      <Count>Based on {totalReviews} reviews</Count>
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

    @media only screen and (min-width: 112.5em) {
      font-size: 2.2rem;
    }
  }
`;

const Count = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textRevCount};
  letter-spacing: 0.5px;

  @media only screen and (min-width: 112.5em) {
    font-size: 1.4rem;
  }
`;

export default RatingInfo;
