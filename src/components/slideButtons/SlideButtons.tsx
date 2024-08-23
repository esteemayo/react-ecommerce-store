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

export default SlideButtons;
