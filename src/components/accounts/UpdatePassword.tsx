import { useEffect } from 'react';
import { toast } from 'react-toastify';

import Button from './Button';
import Input from './Input';
import CancelButton from './CancelButton';

import { Container } from './Container';
import { ButtonContainer } from './ButtonContainer';

import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';

import Form from '../form/Form';
import { UpdatePasswordData, UpdatePasswordErrors } from '../../types';

import { updatePassword } from '../../services/authService';
import { validatePasswordForm } from '../../validations/password';

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
        <Input
          id='password1'
          name='password'
          type='password'
          label='Password'
          value={data.password}
          placeholder='Type in your new password'
          onChange={handleChange}
          error={errors.password}
        />
        <Input
          id='confirm-password'
          name='confirmPassword'
          type='password'
          label='Confirm Password'
          value={data.confirmPassword}
          placeholder='Confirm your password'
          onChange={handleChange}
          error={errors.confirmPassword}
        />
        <Input
          id='current-password'
          name='currentPassword'
          type='password'
          label='Current Password'
          value={data.currentPassword}
          placeholder='Type in your current password'
          onChange={handleChange}
          error={errors.currentPassword}
        />
        <ButtonContainer>
          <CancelButton text='Cancel' onClick={handleClose} />
          <Button text='Save' disabled={isLoading} loading={isLoading} />
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default UpdatePassword;
