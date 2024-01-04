import Rating from '@mui/material/Rating';

interface StarRatingProps {
  value: number | null;
  name?: string;
  readOnly?: boolean;
  onChange?(
    event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ): void | undefined;
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
