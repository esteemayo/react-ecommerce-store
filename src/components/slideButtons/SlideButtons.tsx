import styled from 'styled-components';

import { SlideButtonsProps } from '../../types';

const SlideButtons = ({ onNext, onPrev, disabled }: SlideButtonsProps) => {
  return (
    <ButtonContainer>
      <Button type='button' disabled={disabled} onClick={onPrev}>
        Prev
      </Button>
      <Button type='button' disabled={disabled} onClick={onNext}>
        Next
      </Button>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Button = styled.button`
  display: inline-block;
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
