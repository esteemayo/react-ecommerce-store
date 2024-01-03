'use client';

import styled from 'styled-components';

import FormError from './FormError';
import { FormGroup } from './FormGroup';

import { SelectProps } from '@/types';

const Select = ({
  data,
  name,
  label,
  error,
  defaultText,
  ...rest
}: SelectProps) => {
  return (
    <FormGroup>
      <Label htmlFor={name}>{label}</Label>
      <StyledSelect {...rest} id={name} name={name}>
        <Option value=''>{defaultText}</Option>
        {data?.map((item) => {
          const { id, name } = item;
          return (
            <Option key={id} value={name}>
              {name}
            </Option>
          );
        })}
      </StyledSelect>
      {error && <FormError message={error} />}
    </FormGroup>
  );
};

export const Label = styled.label`
  display: inline-block;
  font-weight: 600;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.textLabel};
`;

export const StyledSelect = styled.select`
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
`;

export const Option = styled.option`
  text-transform: capitalize;
  background-color: ${({ theme }) => theme.bgProdCard};
  color: inherit;
`;

export default Select;
