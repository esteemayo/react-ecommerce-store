import styled from 'styled-components';

import { SlideButtonsProps } from '../../types';
import SlideButton from '../slideButton/SlideButton';

interface IBtn {
  show: string;
}

const SlideButtons = ({
  disabled,
  isNextBtn,
  isPrevBtn,
  onNext,
  onPrev,
}: SlideButtonsProps) => {
  return (
    <Container>
      <SlideButton
        label='Prev'
        show={isPrevBtn}
        disabled={disabled}
        onAction={onPrev}
      />
      <SlideButton
        label='Next'
        show={isNextBtn}
        disabled={disabled}
        onAction={onNext}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Button = styled.button<IBtn>`
  display: ${({ show }) => (show === 'true' ? 'none' : 'inline-block')};
  outline: none;
  text-align: center;
  text-transform: capitalize;
  font-weight: 500;
  font-size: 1.2rem;
  padding: 3px 0.5rem;
  background-color: transparent;
  color: ${({ theme }) => theme.bgImgBtn};
  border: 1px solid currentColor;
  border-radius: 0.5rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }
`;

export default SlideButtons;
