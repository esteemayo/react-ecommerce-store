import { ResetPasswordData, ResetPasswordErrors } from '../types';

export const validateResetPasswordForm = (data: ResetPasswordData) => {
  const tempErrors: ResetPasswordErrors = {};
  const { password, confirmPassword } = data;

  if (password === '') {
    tempErrors.password = 'Please enter your new password';
  } else if (password.length < 8) {
    tempErrors.password = 'Password should be at least 8 characters long';
  } else if (confirmPassword === '') {
    tempErrors.confirmPassword = 'Please confirm your new password';
  } else if (password !== confirmPassword) {
    tempErrors.confirmPassword = 'Passwords do not match';
  }

  return tempErrors;
};
