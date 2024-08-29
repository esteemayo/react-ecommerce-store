import styled from 'styled-components';

import { SlideButtonProps } from '../../types';

interface IBtn {
  show: string;
}

const SlideButton = ({ label, show, disabled, onAction }: SlideButtonProps) => {
  return (
    <Button
      type='button'
      show={String(show)}
      disabled={disabled}
      onClick={onAction}
    >
      {label}
    </Button>
  );
};

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

  @media only screen and (min-width: 112.5em) {
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
  }

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }
`;

export default SlideButton;
