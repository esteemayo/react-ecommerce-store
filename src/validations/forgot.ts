import { ForgotErrors } from '../types';

export const validateForgotForm = (email: string) => {
  const errors: ForgotErrors = {};

  if (email.trim() === '') {
    errors.email = 'Please enter your email address';
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)*[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }

  return errors;
};
