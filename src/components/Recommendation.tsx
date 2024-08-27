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
  width: 40rem;
  height: 50rem;
  border-radius: 2px;

  @media only screen and (max-width: 64em) {
    width: 35rem;
  }

  @media only screen and (max-width: 50em) {
    width: 55rem;
    height: 60rem;
  }

  @media only screen and (max-width: 31.25em) {
    width: 45rem;
    height: 50rem;
  }

  @media only screen and (max-width: 25em) {
    width: 40rem;
  }

  @media only screen and (max-width: 18.75em) {
    width: 30rem;
    height: auto;
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
    font-size: 1.8rem;
  }
`;

const Price = styled.span`
  display: inline-block;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.3em;

  @media only screen and (min-width: 112.5em) {
    font-size: 1.5rem;
  }
`;

export default Recommendation;
