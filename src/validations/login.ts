import { LoginData, LoginErrors } from '../types';

export const validateLoginForm = (data: LoginData) => {
  const tempErrors: LoginErrors = {};
  const { password, username } = data;

  if (username.trim() === '') {
    tempErrors.username = 'Username must not be empty';
  }

  if (password === '') {
    tempErrors.password = 'Password must not be empty';
  } else if (password.length < 8) {
    tempErrors.password = 'Password should be at least 8 characters long';
  }

  return tempErrors;
};
