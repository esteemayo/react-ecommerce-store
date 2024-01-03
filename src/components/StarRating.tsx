import Rating from '@mui/material/Rating';

interface StarRatingProps {
  value: number;
  name?: string;
  readOnly?: boolean;
  onChange?(e: React.ChangeEvent<HTMLInputElement>, newValue: number): void;
}

const StarRating = ({ value, onChange, ...rest }: StarRatingProps) => {
  return (
    <Rating
      {...rest}
      value={value}
      precision={0.5}
      size='large'
      onChange={onChange}
    />
  );
};

export default StarRating;
