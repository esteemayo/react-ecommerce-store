import styled from 'styled-components';
import { useCallback, useMemo, useState } from 'react';

import Avatar from '../images/Avatar';
import DefaultAvatar from '../images/DefaultAvatar';

import StarRating from '../StarRating';
import DateTime from '../DateTime';
import ShareButton from './ShareButton';

import { excerpts } from '../../utils';
import { ReviewCardProps } from '../../types';

const ReviewCard = ({ user, rating, review, createdAt }: ReviewCardProps) => {
  const [show, setShow] = useState(false);

  const handleToggle = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShow((value) => !value);
  }, []);

  const reviewText = useMemo(() => {
    return show && review?.length > 150 ? review : excerpts(review, 150);
  }, [review, show]);

  const btnLabel = useMemo(() => {
    return show ? 'Less' : 'More';
  }, [show]);

  return (
    <Container>
      <Wrapper>
        <ReviewContainer>
          <Reviewer>
            {!user.image ? (
              <DefaultAvatar name={user.name} />
            ) : (
              <Avatar src={user.image} name={user.name} />
            )}
            <Name>{user.name}</Name>
          </Reviewer>
          <StarRating readOnly value={rating} name='read-only' />
        </ReviewContainer>
        <Review>{reviewText}</Review>
        {review.length > 150 && (
          <Button type='button' onClick={handleToggle}>
            {btnLabel}
          </Button>
        )}
        <DateContainer>
          <DateTime date={createdAt} type='review' />
          <ShareButton />
        </DateContainer>
      </Wrapper>
    </Container>
  );
};

const Container = styled.article`
  width: 65rem;
  background-color: ${({ theme }) => theme.revCardBg};
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.boxRevCard};
  -webkit-box-shadow: ${({ theme }) => theme.boxRevCard};
  -moz-box-shadow: ${({ theme }) => theme.boxRevCard};
  margin-bottom: 2rem;
  line-height: 1.4;

  @media only screen and (max-width: 37.5em) {
    width: 60rem;
    line-height: 1.2;
  }

  @media only screen and (max-width: 31.25em) {
    width: 50rem;
  }

  @media only screen and (max-width: 26.875em) {
    width: 45rem;
  }

  @media only screen and (max-width: 25em) {
    width: 40rem;
  }

  @media only screen and (max-width: 18.75em) {
    width: 31.5rem;
  }

  @media only screen and (min-width: 112.5em) {
    width: 80rem;
    margin-bottom: 3rem;
  }
`;

const Wrapper = styled.div`
  padding: 3rem;

  @media only screen and (max-width: 26.875em) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media only screen and (max-width: 25em) {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  @media only screen and (max-width: 18.75em) {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
`;

const ReviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.star};
    border: 2px solid ${({ theme }) => theme.starBorder};
    border-radius: 0.5rem;
    margin-right: 3px;

    @media only screen and (max-width: 31.25em) {
      font-size: 2.3rem;
      margin-right: 2px;
    }

    @media only screen and (max-width: 25em) {
      font-size: 2rem;
    }

    @media only screen and (min-width: 112.5em) {
      font-size: 3rem;
      margin-right: 0.5rem;
    }
  }
`;

const Reviewer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media only screen and (max-width: 31.25em) {
    gap: 0.7rem;
  }

  @media only screen and (min-width: 112.5em) {
    gap: 2rem;
  }
`;

const Name = styled.h3`
  display: inline-block;
  text-transform: capitalize;
  font-weight: 500;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.text};

  @media only screen and (max-width: 31.25em) {
    font-size: 1.75rem;
  }

  @media only screen and (max-width: 25em) {
    font-size: var(--default-font-size);
  }

  @media only screen and (max-width: 18.75em) {
    font-size: 1.5rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 2.3rem;
  }
`;

const Review = styled.p`
  margin: 2rem 0;
  font-size: 1.65rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.3;
  word-wrap: break-word;

  @media only screen and (max-width: 31.25em) {
    font-size: var(--default-font-size);
  }

  @media only screen and (max-width: 25em) {
    font-size: 1.5rem;
  }

  @media only screen and (max-width: 18.75em) {
    font-size: 1.4rem;
    line-height: 1.2;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 2rem;
  }
`;

const Button = styled.button`
  display: inline-block;
  border: none;
  outline: none;
  text-transform: capitalize;
  text-decoration: underline;
  text-underline-offset: 0.7rem;
  font-weight: 500;
  font-size: var(--default-font-size);
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  margin-bottom: 2rem;
  cursor: pointer;

  @media only screen and (min-width: 112.5em) {
    font-size: 2rem;
  }
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default ReviewCard;
