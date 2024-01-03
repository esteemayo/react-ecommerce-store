'use client';

import styled from 'styled-components';
import Link from 'next/link';

import { SliderItemProps } from '@/types';
import { CommonImage } from '../CommonImage';

interface IType {
  type: string;
}

const SliderItem = ({
  url,
  img,
  desc,
  title,
  index,
  position,
}: SliderItemProps) => {
  return (
    <Article type={position}>
      <Container>
        <StyledImage src={img} fill priority alt={`Slide ${index}`} />
      </Container>
      <Wrapper>
        <Title>{title}</Title>
        <Description>{desc}</Description>
        <Link href={url} passHref>
          <Button type='button'>Shop now</Button>
        </Link>
      </Wrapper>
    </Article>
  );
};

const Article = styled.article<IType>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ type }) => (type === 'activeSlide' ? 1 : 0)};
  transform: translateX(${({ type }) => type === 'activeSlide' && 0});
  transform: translateX(${({ type }) => type === 'lastSlide' && '-100%'});
  transform: translateX(${({ type }) => type === 'nextSlide' && '100%'});
  transition: all 0.3s linear;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const StyledImage = styled(CommonImage)`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  padding: 5rem;
  padding-right: 0;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textSlider};
  position: absolute;
  top: 15%;
  right: 3rem;

  @media only screen and (max-width: 64em) {
    padding: 3rem;
    padding-right: 0;
  }

  @media only screen and (max-width: 50em) {
    width: 100%;
    padding: 0;
    line-height: 1.3;
    top: 50%;
    left: 75%;
    right: 0;
    transform: translate(-50%, -50%);
  }

  @media only screen and (max-width: 37.5em) {
    top: 40%;
    left: 67%;
  }

  a {
    &:link,
    &:visited {
      text-decoration: none;
      color: inherit;
      outline: none;
    }

    &:active,
    &:hover {
      color: currentColor;
    }
  }
`;

const Title = styled.h1`
  font-size: 5rem;
  color: inherit;

  @media only screen and (max-width: 64em) {
    font-size: 4.7rem;
  }

  @media only screen and (max-width: 50em) {
    font-size: 4.5rem;
  }

  @media only screen and (max-width: 37.5em) {
    font-size: 3rem;
    letter-spacing: 2px;
  }

  @media only screen and (max-width: 31.25em) {
    font-size: 2.7rem;
  }

  @media only screen and (max-width: 25em) {
    font-size: 2.3rem;
  }

  @media only screen and (max-width: 18.75em) {
    font-size: 1.65rem;
  }
`;

const Description = styled.p`
  width: 60%;
  margin: 3rem 0;
  font-weight: 500;
  font-size: 2rem;
  color: inherit;
  letter-spacing: 3px;

  @media only screen and (max-width: 64em) {
    font-size: 1.7rem;
    letter-spacing: 0.5rem;
    margin: 2rem 0;
  }

  @media only screen and (max-width: 50em) {
    width: 65% !important;
    font-size: var(--default-font-size);
    margin: 1.5rem 0;
  }

  @media only screen and (max-width: 37.5em) {
    margin: 1rem 0;
    letter-spacing: 2px;
  }

  @media only screen and (max-width: 31.25em) {
    font-size: 1.45rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  @media only screen and (max-width: 25em) {
    font-size: 1.4rem;
    letter-spacing: 0;
  }

  @media only screen and (max-width: 18.75em) {
    width: 68% !important;
    font-size: 1.3rem;
  }
`;

const Button = styled.button`
  display: inline-block;
  padding: 1rem;
  font-size: 1.8rem;
  text-transform: uppercase;
  background-color: transparent;
  color: inherit;
  border: 3px solid ${({ theme }) => theme.textSlider};
  border-radius: 3px;
  outline-color: #ccc;
  cursor: pointer;

  @media only screen and (max-width: 64em) {
    font-size: 1.65rem;
  }

  @media only screen and (max-width: 50em) {
    font-size: 1.57rem;
    border-width: 2px;
  }

  @media only screen and (max-width: 37.5em) {
    padding: 0.7rem;
    font-size: 1.5rem;
  }

  @media only screen and (max-width: 31.25em) {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 1.4rem;
    border-width: 1px;
  }

  @media only screen and (max-width: 25em) {
    font-size: 1.37rem;
  }

  @media only screen and (max-width: 18.75em) {
    padding-top: 3px;
    padding-bottom: 3px;
    font-size: 1.2rem;
  }
`;

export default SliderItem;
