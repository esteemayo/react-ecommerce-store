import { UpdatePasswordData, UpdatePasswordErrors } from '../types';

export const validatePasswordForm = (data: UpdatePasswordData) => {
  const errors: UpdatePasswordErrors = {};
  const { password, confirmPassword, currentPassword } = data;

  if (password === '') {
    errors.password = 'Please enter your new password';
  } else if (password.length < 8) {
    errors.password = 'Password should be at least 8 characters long';
  } else if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your new password';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (currentPassword === '') {
    errors.currentPassword = 'Please enter your current password';
  }

  return errors;
};
