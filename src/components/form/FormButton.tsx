import styled from 'styled-components';

import { FormButtonProps } from '../../types';
import { CommonButton } from '../buttons/CommonButton';

import Spinner from '../Spinner';

const FormButton = ({ label, loading, disabled, ...rest }: FormButtonProps) => {
  return (
    <Button {...rest} disabled={disabled} type='submit'>
      {loading ? <Spinner size='xs' /> : label}
    </Button>
  );
};

const Button = styled(CommonButton)`
  margin-top: 2rem;
  border: none;
  font-weight: 500;
  font-size: 1.4rem;
  width: 100%;
  padding: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 56.25em), only screen and (hover: none) {
    font-size: 1.398rem;
  }

  &:disabled {
    opacity: 0.85;
    cursor: not-allowed;
  }
`;

export default FormButton;
