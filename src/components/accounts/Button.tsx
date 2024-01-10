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
