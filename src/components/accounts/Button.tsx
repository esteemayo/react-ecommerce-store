import styled from 'styled-components';

import Spinner from '../Spinner';
import { CommonButton } from '../buttons/CommonButton';

import { AccountButtonProps } from '../../types';

const Button = ({ text, disabled, loading }: AccountButtonProps) => {
  return (
    <StyledButton type='submit' disabled={disabled}>
      {loading ? <Spinner /> : text}
    </StyledButton>
  );
};

const StyledButton = styled(CommonButton)`
  border: none;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 1.4rem;
  width: 50%;
  padding: 1rem;
  color: ${({ theme }) => theme.textModalDelBtn};

  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 56.25em), only screen and (hover: none) {
    font-size: 1.398rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 1.8rem;
    padding: 1.5rem;
  }

  &:disabled {
    opacity: 0.85;
    cursor: not-allowed;
  }
`;

export default Button;
