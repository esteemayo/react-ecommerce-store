import styled from 'styled-components';

import FormError from './FormError';
import { FormGroup } from './FormGroup';

import { SelectProps } from '../../types';

interface ILabel {
  size?: boolean;
}

const Select = ({
  data,
  name,
  label,
  size,
  error,
  defaultText,
  loading,
  ...rest
}: SelectProps & ILabel) => {
  return (
    <FormGroup>
      <Label htmlFor={name} size={size}>
        {label}
      </Label>
      <StyledSelect {...rest} id={name} name={name}>
        <Option value=''>{defaultText}</Option>
        {loading
          ? 'Loading...'
          : data?.map((item) => {
              const { _id: id, name } = item;
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

export const Label = styled.label<ILabel>`
  display: inline-block;
  width: ${({ size }) => (size ? '7rem' : '13rem')};
  font-weight: 600;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.textLabel};

  @media only screen and (min-width: 112.5em) {
    font-size: 1.8rem;
  }
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
  background-color: ${({ theme }) => theme.bgSelect};
  color: inherit;
`;

export default Select;
