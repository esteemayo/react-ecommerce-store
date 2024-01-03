'use client';

import Input from './Input';
import CancelButton from './CancelButton';
import Button from './Button';

import { Container } from './Container';
import { ButtonContainer } from './ButtonContainer';

import { useForm } from '@/hooks/useForm';
import { passwordInputs } from '@/data/formData';

import Form from '../form/Form';

interface UpdatePasswordProps {
  onCancel(): void;
}

interface FormData {
  password: string;
  confirmPassword: string;
  currentPassword: string;
}

interface IErrors {
  password?: string;
  confirmPassword?: string;
  currentPassword?: string;
}

const initialState: FormData = {
  password: '',
  confirmPassword: '',
  currentPassword: '',
};

const initialError: IErrors = {
  password: '',
  confirmPassword: '',
  currentPassword: '',
};

const UpdatePassword = ({ onCancel }: UpdatePasswordProps) => {
  const validateForm = (data: FormData) => {
    const errors: IErrors = {};
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

  const onSubmitHandler = () => {
    console.log({ ...data });
  };

  const { errors, data, handleClose, handleChange, handleSubmit } = useForm(
    onSubmitHandler,
    initialState,
    initialError,
    validateForm,
    onCancel
  );

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {passwordInputs.map((input) => {
          const { id, name, type, label, placeholder } = input;
          return (
            <Input
              key={id}
              id={id}
              label={label}
              type={type}
              name={name}
              value={data[name]}
              placeholder={placeholder}
              onChange={handleChange}
              error={errors?.[name]}
            />
          );
        })}
        <ButtonContainer>
          <CancelButton text='Cancel' onClick={handleClose} />
          <Button text='Save' />
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default UpdatePassword;
