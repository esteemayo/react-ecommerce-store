import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { CommonImage } from '../CommonImage';
import { SliderItemProps } from '../../types';

interface IPosition {
  position: string;
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
    <Article position={position}>
      <Container>
        <StyledImage src={img} alt={`slide ${index + 1}`} />
      </Container>
      <Wrapper>
        <Title>{title}</Title>
        <Description>{desc}</Description>
        <StyledLink to={url}>
          <Button type='button'>Shop now</Button>
        </StyledLink>
      </Wrapper>
    </Article>
  );
};

const Article = styled.article<IPosition>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ position }) => (position === 'activeSlide' ? 1 : 0)};
  transform: translateX(${({ position }) => setTransform(position)});
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

  @media only screen and (max-width: 64em) {
    right: -20%;
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

  @media only screen and (max-width: 31.25em) {
    top: 50%;
    left: 75%;
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
    font-size: 3.7rem;
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
    margin: 3rem 0;
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  outline: none;

  &:active,
  &:hover {
    color: currentColor;
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
    padding: 1rem;
    font-size: 1.4rem;
    border-width: 2px;
  }

  @media only screen and (max-width: 25em) {
    font-size: 1.37rem;
  }

  @media only screen and (max-width: 18.75em) {
    padding: 0.75rem;
    font-size: 1.2rem;
  }
`;

const setTransform = (position: string) => {
  if (position === 'activeSlide') return 0;
  if (position === 'lastSlide') return '-100%';
  if (position === 'nextSlide') return '100%';
};

export default SliderItem;
