import { ReviewErrors } from '../types';

export const validateReviewInputs = (rating: number | null, review: string) => {
  let errors: ReviewErrors = {};

  if (!rating) {
    errors.rating = 'Rating must not be empty';
  } else if (rating <= 0) {
    errors.rating = 'Rating must not be below 1.0';
  } else if (rating > 5) {
    errors.rating = 'Rating must not be above 5.0';
  }

  if (review.trim() === '') {
    errors.review = 'Review must not be empty';
  }

  return errors;
};
