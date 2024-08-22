import styled from 'styled-components';

import { SlideButtonsProps } from '../../types';

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
      <Button
        type='button'
        show={String(isPrevBtn)}
        disabled={disabled}
        onClick={onPrev}
      >
        Prev
      </Button>
      <Button
        type='button'
        show={String(isNextBtn)}
        disabled={disabled}
        onClick={onNext}
      >
        Next
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Button = styled.button<IBtn>`
  display: ${({ show }) => (show === 'true' ? 'none' : undefined)};
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
