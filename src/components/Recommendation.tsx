import styled from 'styled-components';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { RecommendationProps } from '../types';
import { formatCurrency } from '../utils/formatCurrency';

import { CommonImage } from './CommonImage';

const Recommendation = ({ id, name, price, images }: RecommendationProps) => {
  const url = useMemo(() => {
    return `/products/${encodeURIComponent(id)}`;
  }, [id]);

  return (
    <Container>
      <StyledLink to={url}>
        <StyledImage src={images?.[0]} width={400} height={500} alt={name} />
        <Wrapper>
          <Title>{name}</Title>
          <Price>{formatCurrency(price)}</Price>
        </Wrapper>
      </StyledLink>
    </Container>
  );
};

const Container = styled.article``;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  outline-color: #ddd;
`;

const StyledImage = styled(CommonImage)`
  width: 39.35rem;
  max-height: 49.188rem;
  height: 100%;
  border-radius: 2px;

  @media only screen and (max-width: 64em) {
    width: 32.65rem;
  }

  @media only screen and (max-width: 59.375em) {
    width: 38.5rem;
  }

  @media only screen and (max-width: 50em) {
    width: 40.85rem;
  }

  @media only screen and (max-width: 26.25em) {
    width: 100%;
    height: 100%;
  }

  @media only screen and (min-width: 112.5em) {
    width: 43.3rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  display: inline-block;
  width: 100%;
  text-rendering: optimizeLegibility;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--default-font-size);
  color: ${({ theme }) => theme.text};
  line-height: 1.8rem;
  margin: 1rem 0;
  overflow: hidden;

  @media only screen and (max-width: 18.75em) {
    font-size: 1.5rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 2rem;
  }
`;

const Price = styled.span`
  display: inline-block;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.3em;

  @media only screen and (min-width: 112.5em) {
    font-size: var(--default-font-size);
  }
`;

export default Recommendation;
