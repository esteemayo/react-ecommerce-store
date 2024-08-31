import styled from 'styled-components';

import FormError from './FormError';
import { FormGroup } from './FormGroup';

import { FormInputProps } from '../../types';

interface ILabel {
  small?: string;
}

const FormInput = ({
  name,
  type = 'text',
  label,
  value,
  error,
  small,
  ...rest
}: FormInputProps) => {
  return (
    <FormGroup>
      <Label htmlFor={name} small={small?.toString()}>
        {label}
      </Label>
      <Input {...rest} id={name} type={type} name={name} value={value} />
      {error && <FormError message={error} />}
    </FormGroup>
  );
};

const Label = styled.label<ILabel>`
  display: inline-block;
  width: ${({ small }) => (small === 'true' ? '7rem' : '13rem')};
  text-transform: ${({ small }) => small === 'true' && 'capitalize'};
  font-weight: 600;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.textLabel};

  @media only screen and (min-width: 112.5em) {
    width: ${({ small }) => (small === 'true' ? '10rem' : '20rem')};
    font-size: 2rem;
  }
`;

const Input = styled.input`
  border: none;
  display: inline-block;
  font-family: inherit;
  font-size: 1.5rem;
  width: 100%;
  padding: 1.5rem 1rem;
  background-color: ${({ theme }) => theme.bgInput};
  color: ${({ theme }) => theme.textInput};
  border-radius: 0.5rem;
  outline-color: ${({ theme }) => theme.inputOut};
  caret-color: ${({ theme }) => theme.inputCaret};
  transition: all 0.3s ease;

  @media only screen and (min-width: 112.5em) {
    font-size: 2.3rem;
    padding: 2rem 1.5rem;
  }

  &:focus {
    background-color: transparent;
  }

  &::-webkit-input-placeholder {
    font-weight: 300;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.textRevPlace};

    @media only screen and (min-width: 112.5em) {
      font-size: 2.3rem;
    }
  }
`;

export default FormInput;
