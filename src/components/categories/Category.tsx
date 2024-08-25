import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { CategoryProps } from '../../types';
import { CommonImage } from '../CommonImage';

const Category = ({ data, src, index }: CategoryProps) => {
  const url = useMemo(() => {
    return `/products/category/${encodeURIComponent(data[index]?.category)}`;
  }, [data, index]);

  return (
    <Container>
      <Image src={src} width={225} height={250} alt={data[index]?.category} />
      <HeadingWrapper>
        <MainHeading>{data[index]?.category}</MainHeading>
        <SubHeading>{data[index]?.count}</SubHeading>
      </HeadingWrapper>
      <StyledLink to={url}>
        <Button>
          Shop now
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </StyledLink>
    </Container>
  );
};

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;
  width: 100%;
  height: 100%;
  color: inherit;
  background-color: rgba(0, 0, 0, 0.3);
  outline-color: var(--clr-tertiary-green);

  position: absolute;
  top: 0;
  left: 0;
  transform: scale(0);
  backface-visibility: hidden;

  &:active {
    color: currentColor;
  }
`;

const Button = styled.button`
  border: none;
  font-weight: 600;
  font-size: var(--default-font-size);
  text-transform: capitalize;
  background-color: ${({ theme }) => theme.bgCatBtn};
  color: var(--clr-white);
  outline-color: ${({ theme }) => theme.bgCatBtnOut};
  visibility: hidden;
  opacity: 0;
  z-index: -1;
  cursor: pointer;
  transition: all 0.3s linear;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const Container = styled.article`
  width: 20%;
  border-radius: 2px;
  box-shadow: ${({ theme }) => theme.boxCat};
  -webkit-box-shadow: ${({ theme }) => theme.boxCat};
  -moz-box-shadow: ${({ theme }) => theme.boxCat};
  overflow: hidden;
  position: relative;

  @media only screen and (max-width: 64em) {
    width: 32%;
  }

  @media only screen and (max-width: 59.375em) {
    width: 47%;
  }

  @media only screen and (max-width: 26.25em) {
    width: 100%;
  }

  &:hover ${Button} {
    visibility: visible;
    opacity: 1;
    z-index: 1000;
    transform: scale(1);
  }
`;

const Image = styled(CommonImage)`
  width: 100%;
  height: 25rem;

  @media only screen and (max-width: 37.5em) {
    height: 20rem;
  }

  @media only screen and (max-width: 31.25em) {
    height: 15rem;
  }

  @media only screen and (max-width: 26.25em) {
    height: 30rem;
  }

  @media only screen and (max-width: 23.75em) {
    height: 25rem;
  }

  @media only screen and (max-width: 18.75em) {
    height: 18rem;
  }
`;

const HeadingWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  text-align: right;
  padding: 3px;
  background-color: rgba(248, 210, 104, 0.4);
  color: var(--clr-white);
  line-height: 1.05;
  border-bottom-left-radius: 2.5rem;
`;

const MainHeading = styled.h2`
  text-transform: capitalize;
  font-weight: 600;
  font-size: 1.8rem;
  color: inherit;

  @media only screen and (max-width: 59.375em) {
    font-size: 2.5rem;
    font-weight: 500;
  }

  @media only screen and (max-width: 31.25em) {
    font-size: 2rem;
  }
`;

const SubHeading = styled.h3`
  font-weight: 300;
  font-size: var(--default-font-size);
  color: inherit;

  @media only screen and (max-width: 59.375em) {
    font-size: 1.85rem;
  }

  @media only screen and (max-width: 31.25em) {
    font-size: 1.65rem;
  }

  @media only screen and (max-width: 26.25em) {
    font-size: 2rem;
  }

  @media only screen and (max-width: 18.75em) {
    font-size: 1.7rem;
  }
`;

export default Category;
