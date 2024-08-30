import { PaymentData, PaymentErrors } from '../types';

export const validatePayment = (data: PaymentData) => {
  const errors: PaymentErrors = {};
  const { address, name } = data;

  if (name.trim() === '') {
    errors.name = 'Please enter your name';
  }

  if (address.trim() === '') {
    errors.address = 'Please enter your address';
  }

  return errors;
};
