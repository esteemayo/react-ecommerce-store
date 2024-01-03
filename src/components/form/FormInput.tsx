'use client';

import styled from 'styled-components';

import FormError from './FormError';
import { FormGroup } from './FormGroup';

import { FormInputProps } from '@/types';

interface ILabel {
  login?: boolean;
}

const FormInput = ({
  name,
  type = 'text',
  label,
  value,
  error,
  login,
  ...rest
}: FormInputProps) => {
  return (
    <FormGroup>
      <Label htmlFor={name} login={login}>
        {label}
      </Label>
      <Input {...rest} id={name} type={type} name={name} value={value} />
      {error && <FormError message={error} />}
    </FormGroup>
  );
};

const Label = styled.label<ILabel>`
  display: inline-block;
  width: ${({ login }) => login && '7rem'};
  text-transform: ${({ login }) => login && 'capitalize'};
  font-weight: 600;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.textLabel};
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

  &:focus {
    background-color: transparent;
  }

  &::-webkit-input-placeholder {
    font-weight: 300;
    font-size: 1.5rem;
    color: #bbb;
  }
`;

export default FormInput;
