import { UpdateData, UpdateDataErrors } from '../types';

export const validateDataForm = (data: UpdateData) => {
  const errors: UpdateDataErrors = {};
  const { email, password } = data;

  if (email.trim() === '') {
    errors.email = 'Please enter your new email address';
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)*[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }

  if (password === '') {
    errors.password = 'Please enter your password';
  }

  return errors;
};
