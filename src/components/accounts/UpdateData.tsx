'use client';

import Button from './Button';
import CancelButton from './CancelButton';
import Input from './Input';
import AccountEmail from './AccountEmail';

import { Container } from './Container';
import { ButtonContainer } from './ButtonContainer';

import { useForm } from '@/hooks/useForm';
import { userDataInputs } from '@/data/formData';

import Form from '../form/Form';

interface UpdateDataProps {
  onCancel(): void;
}

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

const UpdateData = ({ onCancel }: UpdateDataProps) => {
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
      <AccountEmail email='brent@email.com' />
      <Form onSubmit={handleSubmit}>
        {userDataInputs.map((input) => {
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

export default UpdateData;
