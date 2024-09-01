import { useEffect } from 'react';
import { toast } from 'react-toastify';

import Form from '../form/Form';
import Input from './Input';
import CancelButton from './CancelButton';
import Button from './Button';
import AccountEmail from './AccountEmail';

import { Container } from './Container';
import { ButtonContainer } from './ButtonContainer';

import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';

import { updateEmail } from '../../services/userService';
import { validateDataForm } from '../../validations/data';

import { userDataInputs } from '../../data/formData';
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
        {userDataInputs.map((input) => {
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

export default UpdateData;
