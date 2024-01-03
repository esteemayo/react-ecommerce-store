import styled from 'styled-components';

import FormError from '../form/FormError';
import { FormGroup } from '../form/FormGroup';

import { AccountInputProps } from '@/types';

const Input = ({ id, name, label, error, ...rest }: AccountInputProps) => {
  return (
    <FormGroup>
      <Label htmlFor={id}>{label}</Label>
      <StyledInput {...rest} id={id} name={name} />
      {error && <FormError message={error} />}
    </FormGroup>
  );
};

const Label = styled.label`
  display: inline-block;
  width: 15rem;
  font-weight: 600;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.textLabel};
`;

const StyledInput = styled.input`
  display: inline-block;
  font-family: inherit;
  font-size: 1.5rem;
  width: 100%;
  padding: 1.25rem 1rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textInput};
  border: 2px solid #f3f4f6;
  border-radius: 0.5rem;
  outline-color: ${({ theme }) => theme.inputOut};
  caret-color: ${({ theme }) => theme.inputCaret};

  @media only screen and (max-width: 25em) {
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
  }

  &::placeholder {
    font-weight: 300;
    font-size: 1.5rem;
    color: #bbb;
  }
`;

export default Input;
