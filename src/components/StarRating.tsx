import Rating from '@mui/material/Rating';

import { StarRatingProps } from '../types';

const StarRating = ({ name, value, ...rest }: StarRatingProps) => {
  return <Rating {...rest} name={name} value={value} precision={0.5} />;
};

export default StarRating;
