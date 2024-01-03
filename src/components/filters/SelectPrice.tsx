import styled from 'styled-components';

import { Label } from './Label';
import { StyledSelect } from './StyledSelect';
import { Filter } from './Filter';

import { SelectPriceProps } from '@/types';

const SelectPrice = ({ name, label, options, ...rest }: SelectPriceProps) => {
  return (
    <Filter>
      <Label htmlFor={name}>{label}</Label>
      <StyledSelect {...rest} id={name} name={name}>
        {options.map((item) => {
          const { value, text } = item;
          return (
            <Option key={value} value={value}>
              {text}
            </Option>
          );
        })}
      </StyledSelect>
    </Filter>
  );
};

const Option = styled.option`
  text-transform: capitalize;
  background-color: ${({ theme }) => theme.bgProdCard};
  color: inherit;
`;

export default SelectPrice;
