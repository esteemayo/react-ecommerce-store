import styled from 'styled-components';

import FormError from '../form/FormError';
import { FormGroup } from '../form/FormGroup';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  value: string | number | readonly string[];
  placeholder?: string;
  type?: string;
  error?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const Input = ({ name, label, type = 'text', error, ...rest }: InputProps) => {
  return (
    <FormGroup>
      <Label htmlFor={name}>{label}</Label>
      <StyledInput {...rest} id={name} name={name} type={type} />
      {error && <FormError message={error} />}
    </FormGroup>
  );
};

export const Label = styled.label`
  display: inline-block;
  width: 5rem;
  text-transform: capitalize;
  font-weight: 600;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.textLabel};

  @media only screen and (min-width: 112.5em) {
    font-size: 2rem;
  }
`;

const StyledInput = styled.input`
  display: inline-block;
  font-family: inherit;
  font-size: 1.5rem;
  width: 100%;
  padding: 1.5rem 1rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textInput};
  border: 2px solid ${({ theme }) => theme.modalInputBorder};
  border-radius: 0.5rem;
  outline-color: ${({ theme }) => theme.inputOut};
  caret-color: ${({ theme }) => theme.inputCaret};

  @media only screen and (max-width: 18.75em) {
    padding-top: 1.4rem;
    padding-bottom: 1.4rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 2.3rem;
    padding: 2rem 1.5rem;
  }

  &::placeholder {
    font-weight: 300;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.textRevPlace};

    @media only screen and (min-width: 112.5em) {
      font-size: 2.3rem;
    }
  }
`;

export default Input;
