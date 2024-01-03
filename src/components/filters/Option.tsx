import styled from 'styled-components';

interface OptionProps {
  value?: string | number | readonly string[];
}

const Option = ({ value }: OptionProps) => {
  return <StyledOption value={value}>{value}</StyledOption>;
};

const StyledOption = styled.option`
  text-transform: capitalize;
  background-color: ${({ theme }) => theme.bgProdCard};
  color: inherit;
`;

export default Option;
