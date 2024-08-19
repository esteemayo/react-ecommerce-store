import Rating from '@mui/material/Rating';

interface StarRatingProps {
  name: 'read-only' | 'hover-feedback' | 'disabled' | 'no-value';
  value: number | null;
  readOnly?: boolean;
  onChange?:
    | ((
        event: React.SyntheticEvent<Element, Event>,
        value: number | null
      ) => void)
    | undefined;
}

const StarRating = ({ name, value, ...rest }: StarRatingProps) => {
  return (
    <Rating {...rest} name={name} value={value} precision={0.5} size='large' />
  );
};

export default StarRating;
