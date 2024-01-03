import styled from 'styled-components';

import StarRating from '../StarRating';
import { CardReviewProps } from '@/types';

const CardReview = ({
  reviewLabel,
  ratingsAverage,
  ratingsQuantity,
}: CardReviewProps) => {
  return (
    <Container>
      <StarRating readOnly value={ratingsAverage} name='read-only' />
      <Wrapper>
        <Rating>
          ({ratingsQuantity} {reviewLabel})
        </Rating>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;

  svg {
    font-size: 2.3rem;
    fill: ${({ theme }) => theme.star};

    @media only screen and (max-width: 35em) {
      font-size: 2rem;
    }
  }
`;

const Wrapper = styled.div`
  span {
    color: ${({ theme }) => theme.star};

    @media only screen and (max-width: 35em) {
      font-size: 1.4rem;
    }
  }
`;

const Rating = styled.span``;

export default CardReview;
