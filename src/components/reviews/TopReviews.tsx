import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import Spinner from '../Spinner';
import Header from '../Header';
import ReviewItem from './ReviewItem';

import { ReviewType } from '../../types';
import { getTopReviews } from '../../services/reviewService';

import { StyledWrapper } from '../StyledWrapper';

const fetchTopReviews = async () => {
  const { data } = await getTopReviews();
  return data;
};

interface IBtn {
  direction: string;
}

const TopReviews = () => {
  const {
    isLoading,
    error,
    data: reviews,
  } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => fetchTopReviews(),
  });

  const reviewRef = useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const [clickLimit, setClickLimit] = useState(window.innerWidth / 730);

  const lastIndex = reviews?.lastIndexOf(reviews?.slice(-1)[0]);

  const handleClick = useCallback(
    (direction: string) => {
      setIsMoved(true);

      const container = reviewRef.current as HTMLDivElement;
      const distance = container.getBoundingClientRect().x - 50;

      if (direction === 'left') {
        setCurrentSlide((value) => value - 1);
        container.style.transform = `translateX(${730 + distance}px)`;
      }

      if (direction === 'right' && currentSlide < 10 - clickLimit) {
        setCurrentSlide((value) => value + 1);
        container.style.transform = `translateX(${-730 + distance}px)`;
      }
    },
    [clickLimit, currentSlide]
  );

  const handleResize = useCallback(() => {
    setClickLimit(window.innerWidth / 730);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <Container>
      <StyledWrapper>
        <Header title="You didn't hear it from us" />
      </StyledWrapper>
      {isLoading ? (
        <Box>
          <Spinner size='md' />
        </Box>
      ) : error ? (
        <Box>
          <ErrorMessage>Something went wrong!</ErrorMessage>
        </Box>
      ) : (
        <Wrapper>
          <IconButton
            direction='left'
            onClick={() => handleClick('left')}
            style={{
              display: !isMoved || currentSlide === 0 ? 'none' : undefined,
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </IconButton>
          <ReviewContainer ref={reviewRef}>
            {reviews?.map((review: ReviewType) => {
              return <ReviewItem key={review._id} {...review} />;
            })}
          </ReviewContainer>
          <IconButton
            direction='right'
            onClick={() => handleClick('right')}
            style={{
              display: currentSlide === lastIndex - 1 ? 'none' : undefined,
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </IconButton>
        </Wrapper>
      )}
    </Container>
  );
};

const Container = styled.section`
  width: 100vw;
  padding: 10rem 0;
  background-color: ${({ theme }) => theme.bgLight};

  @media only screen and (max-width: 64em) {
    padding-top: 8rem;
    padding-bottom: 8rem;
  }
`;

const Box = styled.div`
  width: 100%;
  padding: 3rem 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled.span``;

const Wrapper = styled.div`
  position: relative;
`;

const IconButton = styled.button<IBtn>`
  border: none;
  width: 4rem;
  height: 4rem;
  background-color: ${({ theme }) => theme.bgRevArrowBtn};
  color: ${({ theme }) => theme.textRevArrowBtn};
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.boxRev};
  -webkit-box-shadow: ${({ theme }) => theme.boxRev};
  -moz-box-shadow: ${({ theme }) => theme.boxRev};
  outline-color: #777;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: ${({ direction }) => direction === 'left' && '8.2rem'};
  right: ${({ direction }) => direction === 'right' && 0};
  transform: translate(-50%);
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 50em) {
    left: ${({ direction }) => direction === 'left' && '4.5rem'};
  }

  @media only screen and (max-width: 43.75em) {
    width: 3.5rem;
    height: 3.5rem;
    font-size: 1.55rem;
  }

  @media only screen and (min-width: 112.5em) {
    width: 5rem;
    height: 5rem;
  }

  svg {
    color: inherit;

    @media only screen and (min-width: 112.5em) {
      font-size: 1.7rem;
    }
  }
`;

const ReviewContainer = styled.div`
  margin-left: 5rem;
  margin-top: 1rem;
  display: flex;
  width: max-content;
  transition: all 0.3s ease;
  animation-timing-function: cubic-bezier(0.04, 1.72, 0.51, 0.15);
`;

export default TopReviews;
