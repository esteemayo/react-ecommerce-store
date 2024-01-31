import { RegisterData, RegisterErrors } from '../types';

export const validateRegisterForm = (data: RegisterData) => {
  const errors: RegisterErrors = {};
  const { name, email, username, phone, password, confirmPassword, country } =
    data;

  if (name.trim() === '') {
    errors.name = 'Name must not be empty';
  }

  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)*[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }

  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }

  if (phone.trim() === '') {
    errors.username = 'Phone must not be empty';
  }

  if (password === '') {
    errors.password = 'Password must not be empty';
  } else if (password.length < 8) {
    errors.password = 'Password should be at least 8 characters long';
  } else if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your new password';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (country.trim() === '') {
    errors.country = 'Country must not be empty';
  }

  return errors;
};
