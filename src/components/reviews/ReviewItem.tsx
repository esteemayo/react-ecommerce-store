import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';

import ReviewImage from './ReviewImage';
import ReviewContent from './ReviewContent';

import { ReviewItemProps } from '../../types';
import { getTotalReviewsOnProduct } from '../../services/reviewService';

const ReviewItem = ({ _id: id, user, rating, review }: ReviewItemProps) => {
  const [totalReviews, setTotalReviews] = useState<number>(0);

  const reviewer = useMemo(() => {
    const name = user.name.split(' ');

    return `
        ${name[0]}
        ${name[1].charAt(0)}.
      `;
  }, [user]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getTotalReviewsOnProduct(id);
        setTotalReviews(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  return (
    <Container>
      <Wrapper>
        <ReviewContent
          rating={rating}
          review={review}
          reviewer={reviewer}
          totalReviews={totalReviews}
        />
        <ReviewImage name={reviewer} photo={user.image} />
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
