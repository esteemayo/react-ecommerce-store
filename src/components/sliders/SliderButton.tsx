'use client';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SliderButtonProps } from '@/types';

interface IBtn {
  direction: string;
}

const SliderButton = ({ icon, direction, onClick }: SliderButtonProps) => {
  return (
    <Button type='button' direction={direction} onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
};

const Button = styled.button<IBtn>`
  position: absolute;
  top: 50%;
  left: ${({ direction }) => direction === 'left' && '1rem'};
  right: ${({ direction }) => direction === 'right' && '2.6rem'};
  transform: translateY(-50%);
  width: 4rem;
  height: 4rem;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.bgCarouselBtn};
  color: ${({ theme }) => theme.textCarouselBtn};
  border: 2px solid ${({ theme }) => theme.bgCarouselBtn};
  outline: none;
  border-radius: 50%;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.04);
  -webkit-box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.04);
  -moz-box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: all 0.5s ease;

  @media only screen and (max-width: 64em) {
    left: ${({ direction }) => direction === 'left' && '2.15rem'};
  }

  @media only screen and (max-width: 37.5em) {
    width: 3.5rem;
    height: 3.5rem;
  }

  @media only screen and (max-width: 25em) {
    width: 3rem;
    height: 3rem;
  }

  @media only screen and (max-width: 18.75em) {
    width: 2.5rem;
    height: 2.5rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.bgCarouselBtnHov};
    color: ${({ theme }) => theme.bgCarouselBtn};
  }

  svg {
    font-size: inherit;
    color: inherit;
  }
`;

export default SliderButton;
