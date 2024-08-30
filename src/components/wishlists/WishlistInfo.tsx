import styled from 'styled-components';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { CommonImage } from '../CommonImage';
import { WishlistInfoProps } from '../../types';

const WishlistInfo = ({
  id,
  desc,
  name,
  image,
  excerpts,
}: WishlistInfoProps) => {
  const url = useMemo(() => {
    return `/products/${encodeURIComponent(id)}`;
  }, [id]);

  return (
    <Container>
      <ImageContainer>
        <StyledImage
          src={image ?? '/img/img-1.jpg'}
          width={80}
          height={80}
          alt=''
        />
      </ImageContainer>
      <Overview>
        <ProductName>
          <StyledLink to={url}>{name}</StyledLink>
        </ProductName>
        <Description>{excerpts(desc, 120)}</Description>
      </Overview>
    </Container>
  );
};

const Container = styled.div`
  flex: 4;
  display: flex;
  align-items: center;
  gap: 2.5rem;

  @media only screen and (max-width: 64em) {
    flex: 3;
  }

  @media only screen and (max-width: 37.5em) {
    flex: 1.5;
  }

  @media only screen and (max-width: 18.75em) {
    align-items: flex-start;
    gap: 1.5rem;
  }
`;

const ImageContainer = styled.div`
  width: 8rem;
  height: 8rem;
  background-color: #ede9e6;

  @media only screen and (max-width: 18.75em) {
    width: 6.5rem;
    height: 6.5rem;
  }

  @media only screen and (min-width: 112.5em) {
    width: 10rem;
    height: 10rem;
  }
`;

const StyledImage = styled(CommonImage)`
  width: 8rem;
  height: 8rem;

  @media only screen and (max-width: 18.75em) {
    width: 6.5rem;
    height: 6.5rem;
  }

  @media only screen and (min-width: 112.5em) {
    width: 10rem;
    height: 10rem;
  }
`;

const Overview = styled.div``;

const ProductName = styled.h2`
  display: inline-block;
  text-rendering: optimizeLegibility;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  font-size: 2rem;
  color: ${({ theme }) => theme.textWlCardName};
  margin-bottom: 0.5rem;
  line-height: 1;
  overflow: hidden;

  @media only screen and (max-width: 18.75em) {
    font-size: var(--default-font-size);
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 2.3rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 100%;
  color: currentColor;
  transition: all 0.3s ease;
  outline-color: ${({ theme }) => theme.textWlCloseBtnOut};

  &:hover {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.textWlCardName};
    text-underline-offset: 4px;
    color: currentColor;
  }
`;

const Description = styled.p`
  font-size: var(--default-font-size);
  color: ${({ theme }) => theme.textWlCard};
  line-height: 1.2;
  word-wrap: break-word;

  @media only screen and (max-width: 18.75em) {
    font-size: 1.4rem;
  }
`;

export default WishlistInfo;
