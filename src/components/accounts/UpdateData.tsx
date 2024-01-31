import { useEffect } from 'react';
import { toast } from 'react-toastify';

import Button from './Button';
import CancelButton from './CancelButton';
import Input from './Input';
import AccountEmail from './AccountEmail';
import Form from '../form/Form';

import { Container } from './Container';
import { ButtonContainer } from './ButtonContainer';

import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';

import { updateEmail } from '../../services/userService';
import { validateDataForm } from '../../validations/data';

import { UpdateUserData, UpdateDataErrors, UpdateDataProps } from '../../types';

const initialState: UpdateUserData = {
  email: '',
  password: '',
};

const initialError: UpdateDataErrors = {
  email: '',
  password: '',
};

const UpdateData = ({ email, onCancel }: UpdateDataProps) => {
  const {
    isError,
    isLoading,
    isSuccess,
    message,
    reset,
    updateUserEmailFulfilled,
    updateUserEmailPending,
    updateUserEmailRejected,
  } = useAuth();

  const onSubmitHandler = async () => {
    updateUserEmailPending();

    try {
      const credentials = {
        ...data,
      };

      const res = await updateEmail(credentials);
      updateUserEmailFulfilled(res.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: unknown | any) {
      updateUserEmailRejected(err.response.data.message);
    }
  };

  const { errors, data, handleClose, handleChange, handleSubmit } = useForm(
    onSubmitHandler,
    initialState,
    initialError,
    validateDataForm,
    onCancel
  );

  useEffect(() => {
    isSuccess && onCancel();
    isError && toast.error(message);

    return () => reset();
  }, [isError, isSuccess, message, onCancel, reset]);

  return (
    <Container>
      <AccountEmail email={email} />
      <Form onSubmit={handleSubmit}>
        <Input
          id='newEmail'
          name='email'
          type='email'
          label='Email'
          value={data.email}
          placeholder='Type in your new email address'
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          id='passwordCurrent'
          name='password'
          type='password'
          label='Current Password'
          value={data.password}
          placeholder='Type in your current password'
          onChange={handleChange}
          error={errors.password}
        />
        <ButtonContainer>
          <CancelButton text='Cancel' onClick={handleClose} />
          <Button text='Save' disabled={isLoading} loading={isLoading} />
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default UpdateData;
