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

import { UpdateDataProps } from '../../types';
import { updateEmail } from '../../services/userService';

interface FormData {
  email: string;
  password: string;
}

interface IErrors {
  email?: string;
  password?: string;
}

const initialState: FormData = {
  email: '',
  password: '',
};

const initialError: IErrors = {
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

  const validateForm = (data: FormData) => {
    const errors: IErrors = {};
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

  const onSubmitHandler = async () => {
    updateUserEmailPending();

    try {
      const credentials = {
        ...data,
      };

      const res = await updateEmail(credentials);
      console.log(res.data);
      updateUserEmailFulfilled(res.data);

      console.log({ ...data });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: unknown | any) {
      updateUserEmailRejected(err.response.data.message);
    }
  };

  const { errors, data, handleClose, handleChange, handleSubmit } = useForm(
    onSubmitHandler,
    initialState,
    initialError,
    validateForm,
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
