import styled from 'styled-components';

import { Label } from './Label';
import { Filter } from './Filter';

import { RangeInputProps } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';

const RangeInput = ({ name, label, price, ...rest }: RangeInputProps) => {
  return (
    <Filter>
      <Label htmlFor={name}>
        {label} {formatCurrency(price)}
      </Label>
      <Input {...rest} id={name} name={name} />
    </Filter>
  );
};

const Input = styled.input.attrs({
  type: 'range',
})`
  display: inline-block;
  width: 20rem;
  padding: 3px;
  font-family: inherit;
  font-size: 1.4rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textFilterSelect};
  border: 1px solid #ddd;
  border-radius: 3px;
  outline-color: ${({ theme }) => theme.filterOut};

  @media only screen and (max-width: 37.5em) {
    width: 26rem;
  }

  @media only screen and (max-width: 31.25em) {
    width: 40rem;
  }

  @media only screen and (max-width: 25em) {
    width: 39rem;
  }

  @media only screen and (max-width: 21.875em) {
    width: 37rem;
  }

  @media only screen and (max-width: 18.75em) {
    width: 31rem;
  }
`;

export default RangeInput;
