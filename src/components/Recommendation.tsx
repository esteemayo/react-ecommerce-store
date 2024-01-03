'use client';

import styled from 'styled-components';

import { RecommendationProps } from '@/types';
import RecommendationItem from './RecommendationItem';

const Recommendation = ({ data, productId }: RecommendationProps) => {
  return (
    <Container>
      <Heading>You might also like</Heading>
      <Wrapper>
        {data
          .filter((item) => item.id !== productId)
          .slice(0, 3)
          .map((item) => {
            return <RecommendationItem key={item.id} {...item} />;
          })}
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  width: 100vw;
  max-width: 120rem;
  margin: 0 auto;
  margin-bottom: 10rem;

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

  @media only screen and (max-width: 25em) {
    padding-left: 3rem;
    padding-right: 3rem;
  }
`;

const Heading = styled.h1`
  display: inline-block;
  text-align: left;
  font-weight: 500;
  font-size: 3.2rem;
  color: ${({ theme }) => theme.textProdHeader};
  margin: 5rem 0;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media only screen and (max-width: 64em) {
    flex-wrap: wrap;
    gap: 3rem;
  }
`;

export default Recommendation;
