import { useEffect } from 'react';
import { toast } from 'react-toastify';

import Form from '../form/Form';
import Input from './Input';
import CancelButton from './CancelButton';
import Button from './Button';

import { Container } from './Container';
import { ButtonContainer } from './ButtonContainer';

import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';

import { updatePassword } from '../../services/authService';
import { passwordInputs } from '../../data/formData';
import { validatePasswordForm } from '../../validations/password';

import { UpdatePasswordData, UpdatePasswordErrors } from '../../types';

interface UpdatePasswordProps {
  onCancel(): void;
}

const initialState: UpdatePasswordData = {
  password: '',
  confirmPassword: '',
  currentPassword: '',
};

const initialError: UpdatePasswordErrors = {
  password: '',
  confirmPassword: '',
  currentPassword: '',
};

const UpdatePassword = ({ onCancel }: UpdatePasswordProps) => {
  const {
    isError,
    isLoading,
    isSuccess,
    message,
    reset,
    updateUserPasswordFulfilled,
    updateUserPasswordPending,
    updateUserPasswordRejected,
  } = useAuth();

  const onSubmitHandler = async () => {
    updateUserPasswordPending();

    try {
      const credentials = {
        ...data,
      };

      const res = await updatePassword(credentials);
      updateUserPasswordFulfilled(res.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: unknown | any) {
      updateUserPasswordRejected(err.response.data.message);
    }
  };

  const { errors, data, handleClose, handleChange, handleSubmit } = useForm(
    onSubmitHandler,
    initialState,
    initialError,
    validatePasswordForm,
    onCancel
  );

  useEffect(() => {
    isSuccess && onCancel();
    isError && toast.error(message);

    return () => reset();
  }, [isError, isSuccess, message, onCancel, reset]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {passwordInputs.map((input) => {
          const { id, name, type, label, placeholder } = input;
          return (
            <Input
              key={id}
              id={id}
              name={name}
              type={type}
              label={label}
              value={data[name as keyof typeof data]}
              placeholder={placeholder}
              onChange={handleChange}
              error={errors[name as keyof typeof errors]}
            />
          );
        })}
        <ButtonContainer>
          <CancelButton text='Cancel' onClick={handleClose} />
          <Button text='Save' disabled={isLoading} loading={isLoading} />
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default UpdatePassword;
