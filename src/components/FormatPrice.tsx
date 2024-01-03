import { NumericFormat } from 'react-number-format';

interface FormatPriceProps {
  value: number;
}

const FormatPrice = ({ value }: FormatPriceProps) => {
  return (
    <NumericFormat
      value={value}
      displayType={'text'}
      thousandSeparator={true}
      prefix={'$'}
    />
  );
};

export default FormatPrice;
