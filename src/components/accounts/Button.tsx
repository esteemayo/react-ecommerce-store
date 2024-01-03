import styled from 'styled-components';

import { AccountButtonProps } from '@/types';
import { CommonButton } from '../buttons/CommonButton';

const Button = ({ text, disabled }: AccountButtonProps) => {
  return (
    <StyledButton type='submit' disabled={disabled}>
      {text}
    </StyledButton>
  );
};

const StyledButton = styled(CommonButton)`
  display: inline-block;
  border: none;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 1.4rem;
  width: 50%;
  padding: 1rem;
  color: ${({ theme }) => theme.textModalDelBtn};

  @media only screen and (max-width: 56.25em), only screen and (hover: none) {
    font-size: 1.398rem;
  }

  &:disabled {
    opacity: 0.85;
    cursor: not-allowed;
  }
`;

export default Button;
